'use client'
import SearchIcon from './icons/SearchIcon'

interface Props {
  getUser: (username:string) => Promise<void>
}

const FormSearchUser = ({getUser}: Props) => {

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    if(!username) return;
    await getUser(username)
  }

  return (
    <form onSubmit={handleSubmit}
    className="flex gap-2 items-center dark:bg-blue-900 bg-white shadow-md dark:shadow-none p-2 rounded-xl mb-6">
    <span className="min-w-[20px]">
      <SearchIcon className="fill-blue-500" />
    </span>
    <input name='username' type="text" placeholder="Search GitHub username" className="h-[56px] flex-1 py-2 rounded-lg bg-transparent dark:placeholder:text-white placeholder:text-black  dark:text-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <button className="bg-blue-500 rounded-lg py-4 px-4 font-bold text-white">Search</button>
  </form>
  )
}

export default FormSearchUser