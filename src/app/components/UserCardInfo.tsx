import LocationIcon from "./icons/LocationIcon";
import ShareIcon from "./icons/ShareIcon";
import BuildingIcon from "./icons/BuildingIcon";
import TwitterIcon from "./icons/TwitterIcon";
import { User } from "../interfaces/user";
import Image from "next/image";

interface Props {
  user: User | null;
}

function validateUrl(url: string) {
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }
  return url;
}

const socialIconStyle = { fill: "var(--color-text-secondary)" };

const UserCardInfo = ({ user }: Props) => {
  const socialLinks = [
    {
      icon: <LocationIcon width="1.1rem" style={socialIconStyle} />,
      text: user?.location || "No location",
      href: null,
    },
    {
      icon: <ShareIcon width="1.1rem" style={socialIconStyle} />,
      text: user?.blog || "No blog",
      href: user?.blog ? validateUrl(user.blog) : null,
    },
    {
      icon: <TwitterIcon width="1.1rem" style={socialIconStyle} />,
      text: user?.twitter_username || "Not available",
      href: user?.twitter_username
        ? `https://twitter.com/${user.twitter_username}`
        : null,
    },
    {
      icon: <BuildingIcon width="1.1rem" style={socialIconStyle} />,
      text: user?.company || "No company",
      href: null,
    },
  ];

  const stats = [
    { label: "Repos", value: user?.public_repos },
    { label: "Followers", value: user?.followers },
    { label: "Following", value: user?.following },
  ];

  return (
    <article
      className="glass-card grid-areas rounded-2xl p-6 sm:p-8"
      style={{ color: "var(--color-text-primary)" }}
    >
      {/* Avatar with glow */}
      <div className="section-logo flex items-start justify-center">
        <div className="relative">
          <div
            className="absolute -inset-1 rounded-full opacity-50 blur-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))",
            }}
          />
          <Image
            src={user?.avatar_url!}
            width={120}
            height={120}
            alt={`Profile image of ${user?.name || user?.login}`}
            className="relative rounded-full"
            style={{
              outline: "2px solid var(--color-border-glass)",
              outlineOffset: "2px",
            }}
          />
        </div>
      </div>

      {/* Name + Handle */}
      <div className="section-title flex flex-col justify-center">
        <h2
          className="font-bold text-2xl sm:text-3xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          {user?.name || user?.login}
        </h2>
        <a
          href={user?.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm mt-1 transition-colors duration-200 hover:underline"
          style={{ color: "var(--color-accent)" }}
        >
          @{user?.login}
        </a>
      </div>

      {/* Join date */}
      <p
        className="section-date lg:text-right text-sm flex items-center lg:justify-end gap-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        Joined{" "}
        {new Date(user?.created_at || "").toLocaleString("en", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      {/* Bio */}
      <p
        className="section-description mt-4 leading-relaxed text-sm sm:text-base"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {user?.bio || "This profile has no bio."}
      </p>

      {/* Stats */}
      <div
        className="section-number flex justify-around gap-4 mt-6 rounded-2xl p-6"
        style={{ backgroundColor: "var(--color-stats-bg)" }}
      >
        {stats.map((stat) => (
          <article key={stat.label} className="text-center">
            <p
              className="text-xs uppercase tracking-wider mb-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              {stat.label}
            </p>
            <p
              className="font-bold text-xl sm:text-2xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              {stat.value}
            </p>
          </article>
        ))}
      </div>

      {/* Social links */}
      <div className="section-social grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
        {socialLinks.map((item, i) => (
          <article
            key={i}
            className="hover-surface flex items-center gap-3 py-2 px-3 rounded-lg"
          >
            <i className="shrink-0 w-5 h-5 flex items-center justify-center">
              {item.icon}
            </i>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm transition-colors duration-200 hover:underline"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item.text}
              </a>
            ) : (
              <span
                className="truncate text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {item.text}
              </span>
            )}
          </article>
        ))}
      </div>
    </article>
  );
};

export default UserCardInfo;
