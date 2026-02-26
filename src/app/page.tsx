'use client'
import { useState } from "react"
import FormSearchUser from "./components/FormSearchUser"
import UserCardInfo from "./components/UserCardInfo"
import { User } from '@/app/interfaces/user'

const Home = () => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getUser = async (username: string) => {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const data = await res.json()

    if (!res.ok) {
      setUser(null)
      setError("User not found")
      return
    }

    setUser(data)
    setError(null)
  }

  return (
    <>
      <FormSearchUser getUser={getUser} />

      {user && (
        <div key={user.login} className="animate-card-enter">
          <UserCardInfo user={user} />
        </div>
      )}

      {error && (
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
    </>
  )
}

export default Home
