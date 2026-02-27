import { GitHubError } from '../lib/github'

interface Props {
  error: GitHubError
  onRetry?: () => void
}

const errorConfig = {
  not_found: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
        <path d="M18 18L30 30M30 18L18 30" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    borderColor: 'rgba(239, 68, 68, 0.3)',
    accentColor: '#f87171',
  },
  rate_limit: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
        <circle cx="24" cy="24" r="10" stroke="#fbbf24" strokeWidth="2" />
        <path d="M24 18V25L28 28" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    borderColor: 'rgba(251, 191, 36, 0.3)',
    accentColor: '#fbbf24',
  },
  server_error: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
        <path d="M24 16V28" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="33" r="1.5" fill="#f97316" />
      </svg>
    ),
    borderColor: 'rgba(249, 115, 22, 0.3)',
    accentColor: '#f97316',
  },
  network_error: {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="var(--color-text-muted)" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
        <path d="M15 24C15 24 18 18 24 18C30 18 33 24 33 24" stroke="#f87171" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <path d="M18 28C18 28 20 24 24 24C28 24 30 28 30 28" stroke="#f87171" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="24" cy="32" r="2" fill="#f87171" />
        <path d="M14 14L34 34" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    borderColor: 'rgba(239, 68, 68, 0.3)',
    accentColor: '#f87171',
  },
}

const ErrorCard = ({ error, onRetry }: Props) => {
  const config = errorConfig[error.type]

  return (
    <div
      className="animate-card-enter glass-card rounded-2xl p-8 flex flex-col items-center text-center"
      style={{ borderColor: config.borderColor }}
    >
      <div className="mb-4">
        {config.icon}
      </div>

      <p
        className="font-semibold text-lg mb-2"
        style={{ color: config.accentColor }}
      >
        {error.message}
      </p>

      {error.type === 'rate_limit' && error.resetAt && (
        <p
          className="text-xs mb-4"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Resets at {error.resetAt.toLocaleTimeString('en', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}

      {(error.type === 'network_error' || error.type === 'server_error') && onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-80"
          style={{
            backgroundColor: 'var(--color-surface-hover)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-glass)',
          }}
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorCard
