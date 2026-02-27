import { User } from '../interfaces/user'

export type ErrorType = 'not_found' | 'rate_limit' | 'server_error' | 'network_error'

export interface GitHubError {
  type: ErrorType
  message: string
  resetAt?: Date
  remaining?: number
}

export interface GitHubResponse {
  user?: User
  error?: GitHubError
  rateLimit: {
    limit: number
    remaining: number
    resetAt: Date
  }
}

function parseRateLimit(headers: Headers) {
  return {
    limit: parseInt(headers.get('x-ratelimit-limit') || '60', 10),
    remaining: parseInt(headers.get('x-ratelimit-remaining') || '0', 10),
    resetAt: new Date(parseInt(headers.get('x-ratelimit-reset') || '0', 10) * 1000),
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubResponse> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const rateLimit = parseRateLimit(res.headers)

    if (res.status === 404) {
      return {
        error: {
          type: 'not_found',
          message: `User "${username}" not found`,
        },
        rateLimit,
      }
    }

    if (res.status === 403) {
      const minutesUntilReset = Math.ceil(
        (rateLimit.resetAt.getTime() - Date.now()) / 60000
      )
      return {
        error: {
          type: 'rate_limit',
          message: `API rate limit exceeded. Resets in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? 's' : ''}.`,
          resetAt: rateLimit.resetAt,
          remaining: rateLimit.remaining,
        },
        rateLimit,
      }
    }

    if (!res.ok) {
      return {
        error: {
          type: 'server_error',
          message: `GitHub returned an error (${res.status}). Please try again later.`,
        },
        rateLimit,
      }
    }

    const user = await res.json()
    return { user, rateLimit }
  } catch {
    return {
      error: {
        type: 'network_error',
        message: 'Could not connect to GitHub. Check your internet connection.',
      },
      rateLimit: {
        limit: 60,
        remaining: 0,
        resetAt: new Date(),
      },
    }
  }
}
