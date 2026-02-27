import { User } from "../interfaces/user";
import { Repo } from "../interfaces/repo";
import { Org } from "../interfaces/org";

export type ErrorType =
  | "not_found"
  | "rate_limit"
  | "server_error"
  | "network_error";

export interface GitHubError {
  type: ErrorType;
  message: string;
  resetAt?: Date;
  remaining?: number;
}

export interface GitHubResponse {
  user?: User;
  error?: GitHubError;
  rateLimit: {
    limit: number;
    remaining: number;
    resetAt: Date;
  };
}

const parseRateLimit = (headers: Headers): GitHubResponse["rateLimit"] => {
  return {
    limit: parseInt(headers.get("x-ratelimit-limit") || "60", 10),
    remaining: parseInt(headers.get("x-ratelimit-remaining") || "0", 10),
    resetAt: new Date(
      parseInt(headers.get("x-ratelimit-reset") || "0", 10) * 1000,
    ),
  };
};

export async function fetchGitHubUser(
  username: string,
): Promise<GitHubResponse> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const rateLimit = parseRateLimit(res.headers);

    if (res.status === 404) {
      return {
        error: {
          type: "not_found",
          message: `User "${username}" not found`,
        },
        rateLimit,
      };
    }

    if (res.status === 403) {
      const minutesUntilReset = Math.ceil(
        (rateLimit.resetAt.getTime() - Date.now()) / 60000,
      );
      return {
        error: {
          type: "rate_limit",
          message: `API rate limit exceeded. Resets in ${minutesUntilReset} minute${minutesUntilReset !== 1 ? "s" : ""}.`,
          resetAt: rateLimit.resetAt,
          remaining: rateLimit.remaining,
        },
        rateLimit,
      };
    }

    if (!res.ok) {
      return {
        error: {
          type: "server_error",
          message: `GitHub returned an error (${res.status}). Please try again later.`,
        },
        rateLimit,
      };
    }

    const user = await res.json();
    return { user, rateLimit };
  } catch {
    return {
      error: {
        type: "network_error",
        message: "Could not connect to GitHub. Check your internet connection.",
      },
      rateLimit: {
        limit: 60,
        remaining: 0,
        resetAt: new Date(),
      },
    };
  }
}

export async function fetchAllUserRepos(username: string): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export function getTopRepos(repos: Repo[], count = 6): Repo[] {
  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
}

export function computeLanguageStats(repos: Repo[]): LanguageStat[] {
  const counts: Record<string, number> = {};
  const ownRepos = repos.filter((r) => !r.fork && r.language);

  for (const repo of ownRepos) {
    counts[repo.language!] = (counts[repo.language!] || 0) + 1;
  }

  const total = ownRepos.length;
  if (total === 0) return [];

  return Object.entries(counts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export interface UserStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: LanguageStat[];
  mostRecentPush: string | null;
}

export function computeUserStats(repos: Repo[]): UserStats {
  const ownRepos = repos.filter((r) => !r.fork);

  const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = ownRepos.reduce((sum, r) => sum + r.forks_count, 0);

  const sorted = [...ownRepos].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  const mostRecentPush = sorted.length > 0 ? sorted[0].updated_at : null;

  return {
    totalStars,
    totalForks,
    totalRepos: ownRepos.length,
    languages: computeLanguageStats(repos),
    mostRecentPush,
  };
}

export async function fetchUserOrgs(username: string): Promise<Org[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/orgs`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
