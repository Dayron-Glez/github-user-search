const UserCardSkeleton = () => {
  return (
    <article className="glass-card grid-areas rounded-2xl p-6 sm:p-8 animate-card-enter">
      {/* Avatar skeleton */}
      <div className="section-logo flex items-start justify-center">
        <div className="skeleton-shimmer w-30 h-30 rounded-full" />
      </div>

      {/* Name + Handle skeleton */}
      <div className="section-title flex flex-col justify-center gap-2">
        <div className="skeleton-shimmer h-8 w-48 rounded-lg" />
        <div className="skeleton-shimmer h-4 w-32 rounded-md" />
      </div>

      {/* Join date skeleton */}
      <div className="section-date flex lg:justify-end">
        <div className="skeleton-shimmer h-4 w-36 rounded-md" />
      </div>

      {/* Bio skeleton */}
      <div className="section-description mt-4 space-y-2">
        <div className="skeleton-shimmer h-4 w-full rounded-md" />
        <div className="skeleton-shimmer h-4 w-4/5 rounded-md" />
        <div className="skeleton-shimmer h-4 w-3/5 rounded-md" />
      </div>

      {/* Stats skeleton */}
      <div
        className="section-number flex justify-around gap-4 mt-6 rounded-2xl p-6"
        style={{ backgroundColor: "var(--color-stats-bg)" }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="skeleton-shimmer h-3 w-14 rounded-md" />
            <div className="skeleton-shimmer h-7 w-10 rounded-md" />
          </div>
        ))}
      </div>

      {/* Social links skeleton */}
      <div className="section-social grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 py-2 px-3">
            <div className="skeleton-shimmer w-5 h-5 rounded-full shrink-0" />
            <div className="skeleton-shimmer h-4 w-28 rounded-md" />
          </div>
        ))}
      </div>
    </article>
  );
};

export default UserCardSkeleton;
