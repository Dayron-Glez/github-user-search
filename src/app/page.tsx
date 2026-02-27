'use client'
import { useState } from "react"
import FormSearchUser from "./components/FormSearchUser"
import UserCardInfo from "./components/UserCardInfo"
import UserCardSkeleton from "./components/UserCardSkeleton"
import EmptyState from "./components/EmptyState"
import { User } from '@/app/interfaces/user'

const Home = () => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const getUser = async (username: string) => {
    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const res = await fetch(`https://api.github.com/users/${username}`)
      const data = await res.json()

      if (!res.ok) {
        setUser(null)
        setError("User not found")
        return
      }

      setUser(data)
      setError(null)
    } catch {
      setUser(null)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <FormSearchUser getUser={getUser} />

      {loading && <UserCardSkeleton />}

      {!loading && user && (
        <div key={user.login} className="animate-card-enter">
          <UserCardInfo user={user} />
        </div>
      )}

      {!loading && error && (
        <div
          className="animate-card-enter glass-card rounded-2xl p-6 text-center"
          style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}
        >
          <p
            className="font-semibold text-lg"
            style={{ color: '#f87171' }}
          >
            {error}
          </p>
        </div>
      )}

      {!loading && !user && !error && !hasSearched && <EmptyState />}
    </>
  )
}

export default Home
