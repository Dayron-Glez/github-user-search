const EmptyState = () => {
  return (
    <div className="animate-card-enter glass-card rounded-2xl p-8 sm:p-12 flex flex-col items-center text-center">
      {/* Search illustration */}
      <div className="relative mb-6">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80"
        >
          {/* Outer circle */}
          <circle
            cx="52"
            cy="52"
            r="36"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.4"
          />
          {/* Inner circle */}
          <circle
            cx="52"
            cy="52"
            r="24"
            stroke="var(--color-accent-secondary)"
            strokeWidth="2"
            opacity="0.3"
          />
          {/* Search handle */}
          <line
            x1="78"
            y1="78"
            x2="105"
            y2="105"
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* User icon in center */}
          <circle
            cx="52"
            cy="46"
            r="10"
            fill="var(--color-accent)"
            opacity="0.3"
          />
          <path
            d="M36 68 C36 58 68 58 68 68"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        </svg>

        {/* Decorative dots */}
        <div
          className="absolute -top-2 -right-2 w-3 h-3 rounded-full"
          style={{ backgroundColor: 'var(--color-accent)', opacity: 0.3 }}
        />
        <div
          className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full"
          style={{ backgroundColor: 'var(--color-accent-secondary)', opacity: 0.3 }}
        />
      </div>

      <h3
        className="text-xl font-semibold mb-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Search for a developer
      </h3>
      <p
        className="text-sm max-w-xs leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Enter a GitHub username above to explore their profile, repositories, and activity.
      </p>
    </div>
  )
}

export default EmptyState
