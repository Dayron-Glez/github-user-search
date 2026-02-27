"use client";
import Image from "next/image";
import { SearchEntry } from "../hooks/useSearchHistory";
import { ReactNode } from "react";

interface Props {
  history: SearchEntry[];
  onSelect: (username: string) => void;
  onRemove: (username: string) => void;
  onClear: () => void;
}

const timeAgo = (timestamp: number): string => {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
};

const SearchHistory = ({
  history,
  onSelect,
  onRemove,
  onClear,
}: Props): ReactNode | null => {
  if (history.length === 0) return null;

  return (
    <section className="mb-6 animate-card-enter">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3
          className="text-sm font-semibold"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Recent Searches
        </h3>
        <button
          onClick={onClear}
          className="text-xs cursor-pointer transition-colors duration-200 hover:underline"
          style={{ color: "var(--color-text-muted)" }}
        >
          Clear all
        </button>
      </div>

      <div className="glass-card rounded-2xl p-3 flex flex-col gap-1">
        {history.map((entry) => (
          <div
            key={entry.username}
            className="hover-surface flex items-center gap-3 px-3 py-2.5 rounded-xl group"
          >
            {/* Clickable area: avatar + info */}
            <button
              onClick={() => onSelect(entry.username)}
              className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer text-left"
            >
              <Image
                src={entry.avatarUrl}
                width={32}
                height={32}
                alt={entry.username}
                className="rounded-full shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {entry.name || entry.username}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  @{entry.username}
                </p>
              </div>
              <span
                className="text-[11px] shrink-0 hidden sm:block"
                style={{ color: "var(--color-text-muted)" }}
              >
                {timeAgo(entry.searchedAt)}
              </span>
            </button>

            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(entry.username);
              }}
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer p-1 rounded-md hover:bg-surface-hover"
              aria-label={`Remove ${entry.username} from history`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                style={{ fill: "var(--color-text-muted)" }}
              >
                <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchHistory;
