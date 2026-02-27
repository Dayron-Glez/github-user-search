'use client'
import { useState, useRef } from "react"
import FormSearchUser from "./components/FormSearchUser"
import UserCardInfo from "./components/UserCardInfo"
import UserCardSkeleton from "./components/UserCardSkeleton"
import EmptyState from "./components/EmptyState"
import ErrorCard from "./components/ErrorCard"
import RateLimitIndicator from "./components/RateLimitIndicator"
import RepoList from "./components/RepoList"
import OrgList from "./components/OrgList"
import ActivityOverview from "./components/ActivityOverview"
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

  const handleRetry = () => {
    if (lastUsernameRef.current) {
      getUser(lastUsernameRef.current)
    }
  }

  return (
    <>
      <FormSearchUser getUser={getUser} />

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
