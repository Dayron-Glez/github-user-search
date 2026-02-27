import { Repo } from "../interfaces/repo";
import { getLanguageColor } from "../lib/language-colors";

interface Props {
  repos: Repo[];
}

const formatCount = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const RepoList = ({ repos }: Props) => {
  if (repos.length === 0) return null;

  return (
    <section className="mt-6 animate-card-enter">
      <h3
        className="text-lg font-semibold mb-4 px-1"
        style={{ color: "var(--color-text-primary)" }}
      >
        Popular Repositories
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card hover-surface rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 group"
          >
            {/* Repo name */}
            <div className="flex items-center gap-2 min-w-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                style={{ fill: "var(--color-text-muted)" }}
                className="shrink-0"
              >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
              </svg>
              <span
                className="font-medium text-sm truncate group-hover:underline"
                style={{ color: "var(--color-accent)" }}
              >
                {repo.name}
              </span>
            </div>

            {/* Description */}
            {repo.description && (
              <p
                className="text-xs leading-relaxed line-clamp-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                {repo.description}
              </p>
            )}

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(139, 92, 246, 0.12)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {/* Footer: language + stars + forks */}
            <div className="flex items-center gap-4 mt-auto pt-1">
              {repo.language && (
                <span
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  />
                  {repo.language}
                </span>
              )}

              {repo.stargazers_count > 0 && (
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    style={{ fill: "var(--color-text-muted)" }}
                  >
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                  </svg>
                  {formatCount(repo.stargazers_count)}
                </span>
              )}

              {repo.forks_count > 0 && (
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    style={{ fill: "var(--color-text-muted)" }}
                  >
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                  </svg>
                  {formatCount(repo.forks_count)}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RepoList;
