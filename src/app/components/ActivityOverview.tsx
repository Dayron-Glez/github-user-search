import { UserStats } from "../lib/github";
import { User } from "../interfaces/user";
import LanguageChart from "./LanguageChart";

interface Props {
  stats: UserStats;
  user: User;
}

const formatNumber = (n: number): string => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const timeAgo = (dateStr: string): string => {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;

  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(months / 12);
  return `${years}y ago`;
};

const ActivityOverview = ({ stats, user }: Props) => {
  const statCards = [
    {
      label: "Total Stars",
      value: formatNumber(stats.totalStars),
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          style={{ fill: "#fbbf24" }}
        >
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
        </svg>
      ),
    },
    {
      label: "Total Forks",
      value: formatNumber(stats.totalForks),
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          style={{ fill: "var(--color-accent)" }}
        >
          <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
        </svg>
      ),
    },
    {
      label: "Own Repos",
      value: formatNumber(stats.totalRepos),
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          style={{ fill: "var(--color-accent-secondary)" }}
        >
          <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
        </svg>
      ),
    },
    {
      label: "Public Gists",
      value: formatNumber(user.public_gists),
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          style={{ fill: "var(--color-text-muted)" }}
        >
          <path d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.825.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 0 1 0 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.825-.742-3.955-1.715C2.921 9.818 2.091 8.69 1.679 8.068a.119.119 0 0 1 0-.136ZM8 2c-1.981 0-3.67.992-4.933 2.078C1.86 5.137.907 6.41.397 7.197a1.619 1.619 0 0 0 0 1.606c.51.786 1.465 2.059 2.67 3.12C4.33 13.008 6.019 14 8 14s3.67-.992 4.933-2.078c1.205-1.06 2.159-2.333 2.67-3.119a1.619 1.619 0 0 0 0-1.606c-.51-.786-1.465-2.059-2.67-3.12C11.67 2.993 9.981 2 8 2Zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="mt-6 animate-card-enter">
      <h3
        className="text-lg font-semibold mb-4 px-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        Activity Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Stat cards */}
        {statCards.map((card) => (
          <div
            key={card.label}
            className="glass-card rounded-xl p-4 flex items-center gap-3"
          >
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ backgroundColor: "var(--color-surface-hover)" }}
            >
              {card.icon}
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                {card.label}
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Last activity */}
      {stats.mostRecentPush && (
        <p
          className="text-xs mt-3 px-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          Last activity: {timeAgo(stats.mostRecentPush)}
        </p>
      )}

      {/* Language chart */}
      <div className="mt-4">
        <LanguageChart languages={stats.languages} />
      </div>
    </section>
  );
};

export default ActivityOverview;
