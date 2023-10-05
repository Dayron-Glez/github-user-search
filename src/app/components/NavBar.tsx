'use client'

import { useEffect, useState } from "react"
import SunnyIcon from "./icons/SunnyIcon"
import MoonIcon from "./icons/MoonIcon"



const initialThemeState = () => {

  if(typeof window !== 'undefined') {
    if(localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as 'light' | 'dark'
    }
     return  window.matchMedia("(prefers-colors-scheme: dark)").matches ? 'dark' : 'light' 
  }
  return 'dark'
}
 
const NavBar = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(initialThemeState)
  
  useEffect(() => {
    setHasMounted(true);
  }, [])
  
  useEffect(() => {

      theme === 'dark'
       ? document.documentElement.classList.add('dark')

       : document.documentElement.classList.remove('dark')

    localStorage.setItem('theme', theme)
  }, [theme])
  if(!hasMounted) {
    return <>Loading...</>
  }
  const handleTheme = () =>  theme === 'light' ? setTheme('dark')  :  setTheme('light')
  

  return (
    <header className="flex items-center space-x-2 mb-10 text-white">
        <h1 className="flex-grow text-3xl font-bold dark:text-white text-black">devfinder</h1>
        <span className="uppercase  dark:text-white text-black">{theme === 'light' ? 'light' : 'dark'}</span>
        <button onClick={handleTheme}>
          {theme === 'light' 
          ?  <MoonIcon fill="white" width={20} height={20} className="dark:fill-white fill-blue-500"/>
          : <SunnyIcon fill="white" width={20} height={20} className="dark:fill-white fill-blue-500"/> }
            
        </button>
    </header>
  )
}

export default NavBar