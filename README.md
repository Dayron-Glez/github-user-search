# dev/finder

A modern GitHub user search app built with Next.js 16, React 19, and Tailwind CSS 4. Search any GitHub user and explore their profile, repositories, organizations, and activity stats — all in a polished glassmorphism interface with dark/light theme support.

## Features

- **User Search** — Find any GitHub user by username with real-time feedback
- **Profile Overview** — Avatar, bio, stats (repos, followers, following), location, company, social links
- **Popular Repositories** — Top 6 repos sorted by stars with language indicators, topics, and fork/star counts
- **Organizations** — Visual list of the user's public organizations
- **Activity Overview** — Total stars, forks, own repos, public gists, language distribution chart, and last activity timestamp
- **Search History** — Persistent recent searches stored in localStorage with quick re-search
- **Shareable Links** — Copy a direct link to any profile; recipients see the profile instantly on open
- **Dark/Light Theme** — Toggle between themes with smooth transitions and hydration-safe state
- **Rate Limit Awareness** — Visual indicator of GitHub API usage with color-coded progress bar
- **Error Handling** — Contextual error cards for not found, rate limit, server, and network errors
- **Skeleton Loading** — Shimmer placeholders matching the layout while data loads
- **Responsive Design** — Optimized for desktop and mobile viewports

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router + Turbopack) |
| React | 19.2.4 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.2.1 | Styling (CSS-first config) |
| ESLint | 9.x | Code quality (flat config) |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/app/
├── components/
│   ├── icons/           # SVG icon components
│   ├── ActivityOverview  # Stats cards + language chart
│   ├── EmptyState        # Initial search prompt
│   ├── ErrorCard         # Contextual error display
│   ├── FormSearchUser    # Search input with gradient button
│   ├── LanguageChart     # Stacked bar + legend
│   ├── NavBar            # Brand title + theme toggle
│   ├── OrgList           # User organizations
│   ├── RateLimitIndicator # API usage progress bar
│   ├── RepoList          # Popular repositories grid
│   ├── SearchHistory     # Recent searches with localStorage
│   ├── ShareButton       # Copy profile link to clipboard
│   ├── UserCardInfo      # Full user profile card
│   └── UserCardSkeleton  # Loading placeholder
├── hooks/
│   └── useSearchHistory  # localStorage sync via useSyncExternalStore
├── interfaces/           # TypeScript types (User, Repo, Org)
├── lib/
│   ├── github            # API service + stats computation
│   └── language-colors   # GitHub language color map
├── globals.css           # Design tokens, animations, glass effects
├── layout.tsx            # Root layout with font + theme
└── page.tsx              # Main page with state management
```

## API

Uses the public GitHub REST API (no authentication required):

- `GET /users/{username}` — User profile
- `GET /users/{username}/repos` — User repositories (paginated)
- `GET /users/{username}/orgs` — User organizations

Rate limit: 60 requests/hour for unauthenticated requests.

## Design

The UI follows a **glassmorphism** design system with:

- Semi-transparent surfaces with `backdrop-blur`
- CSS custom properties for theming (no `dark:` prefixes)
- Gradient accents (violet → cyan)
- Smooth card entrance animations
- Animated background orbs

## License

MIT
