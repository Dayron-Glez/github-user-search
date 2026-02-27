'use client'
import { useState, useRef, useEffect } from "react"
import FormSearchUser from "./components/FormSearchUser"
import UserCardInfo from "./components/UserCardInfo"
import UserCardSkeleton from "./components/UserCardSkeleton"
import EmptyState from "./components/EmptyState"
import ErrorCard from "./components/ErrorCard"
import RateLimitIndicator from "./components/RateLimitIndicator"
import RepoList from "./components/RepoList"
import OrgList from "./components/OrgList"
import ActivityOverview from "./components/ActivityOverview"
import SearchHistory from "./components/SearchHistory"
import ShareButton from "./components/ShareButton"
import { useSearchHistory } from "./hooks/useSearchHistory"
import { User } from '@/app/interfaces/user'
import { Repo } from '@/app/interfaces/repo'
import { Org } from '@/app/interfaces/org'
import {
  fetchGitHubUser,
  fetchAllUserRepos,
  getTopRepos,
  fetchUserOrgs,
  computeUserStats,
  GitHubError,
  UserStats,
} from './lib/github'

const Home = () => {
  const [user, setUser] = useState<User | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])
  const [orgs, setOrgs] = useState<Org[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [error, setError] = useState<GitHubError | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [rateLimit, setRateLimit] = useState<{
    limit: number
    remaining: number
    resetAt: Date
  } | null>(null)
  const lastUsernameRef = useRef('')
  const hasAutoSearched = useRef(false)
  const { history, addEntry, removeEntry, clearHistory } = useSearchHistory()

  const getUser = async (username: string) => {
    lastUsernameRef.current = username
    setLoading(true)
    setError(null)
    setHasSearched(true)

    const result = await fetchGitHubUser(username)

    setRateLimit(result.rateLimit)

    if (result.error) {
      setUser(null)
      setRepos([])
      setOrgs([])
      setStats(null)
      setError(result.error)
    } else if (result.user) {
      setUser(result.user)
      setError(null)
      addEntry(result.user.login, result.user.avatar_url, result.user.name)
      window.history.replaceState(null, '', `?user=${encodeURIComponent(result.user.login)}`)

      const [allRepos, userOrgs] = await Promise.all([
        fetchAllUserRepos(username),
        fetchUserOrgs(username),
      ])

      setRepos(getTopRepos(allRepos))
      setOrgs(userOrgs)
      setStats(computeUserStats(allRepos))
    }

    setLoading(false)
  }

  // Auto-search from ?user= query param
  useEffect(() => {
    if (hasAutoSearched.current) return
    const params = new URLSearchParams(window.location.search)
    const userParam = params.get('user')
    if (userParam) {
      hasAutoSearched.current = true
      requestAnimationFrame(() => getUser(userParam))
    }
  })

  const handleRetry = () => {
    if (lastUsernameRef.current) {
      getUser(lastUsernameRef.current)
    }
  }

  return (
    <>
      <FormSearchUser getUser={getUser} />

      {!loading && !user && (
        <SearchHistory
          history={history}
          onSelect={getUser}
          onRemove={removeEntry}
          onClear={clearHistory}
        />
      )}

      {rateLimit && hasSearched && (
        <RateLimitIndicator
          remaining={rateLimit.remaining}
          limit={rateLimit.limit}
          resetAt={rateLimit.resetAt}
        />
      )}

      {loading && <UserCardSkeleton />}

      {!loading && user && (
        <div key={user.login} className="animate-card-enter">
          <UserCardInfo user={user} />
          <div className="flex justify-end mt-4 mb-2 px-1">
            <ShareButton username={user.login} />
          </div>
          {stats && <ActivityOverview stats={stats} user={user} />}
          <RepoList repos={repos} />
          <OrgList orgs={orgs} />
        </div>
      )}

      {!loading && error && (
        <ErrorCard error={error} onRetry={handleRetry} />
      )}

      {!loading && !user && !error && !hasSearched && <EmptyState />}
    </>
  )
}

export default Home
