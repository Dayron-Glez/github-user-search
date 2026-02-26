'use client'

import { useEffect, useState, useSyncExternalStore } from "react"
import SunnyIcon from "./icons/SunnyIcon"
import MoonIcon from "./icons/MoonIcon"

const emptySubscribe = () => () => {}

function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
  }
  return 'dark'
}

const NavBar = () => {
  const hasMounted = useHasMounted()
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  if (!hasMounted) {
    return <>Loading...</>
  }

  const handleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <header className="flex items-center space-x-2 mb-10 text-white">
        <h1 className="flex-grow text-3xl font-bold dark:text-white text-black">devfinder</h1>
        <span className="uppercase dark:text-white text-black">{theme}</span>
        <button onClick={handleTheme}>
          {theme === 'light'
          ? <MoonIcon fill="white" width={20} height={20} className="dark:fill-white fill-blue-500"/>
          : <SunnyIcon fill="white" width={20} height={20} className="dark:fill-white fill-blue-500"/>}
        </button>
    </header>
  )
}

export default NavBar
