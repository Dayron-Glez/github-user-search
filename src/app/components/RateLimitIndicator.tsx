interface Props {
  remaining: number
  limit: number
  resetAt: Date
}

const RateLimitIndicator = ({ remaining, limit, resetAt }: Props) => {
  const percentage = (remaining / limit) * 100
  const isLow = remaining <= 10
  const isCritical = remaining <= 3

  const barColor = isCritical
    ? '#f87171'
    : isLow
      ? '#fbbf24'
      : 'var(--color-accent)'

  return (
    <div
      className="flex items-center gap-3 text-xs px-4 py-2 rounded-xl mb-4 transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border-glass)',
      }}
    >
      <span className="whitespace-nowrap">
        API: {remaining}/{limit}
      </span>

      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface-hover)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        />
      </div>

      {isLow && (
        <span className="whitespace-nowrap" style={{ color: barColor }}>
          Resets {resetAt.toLocaleTimeString('en', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      )}
    </div>
  )
}

export default RateLimitIndicator
