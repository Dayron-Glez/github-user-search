import SearchIcon from './icons/SearchIcon'
const FormSearchUser = () => {
  return (
    <form className="flex gap-2 items-center bg-blue-900 p-2 rounded-xl mb-6">
    <span className="min-w-[20px]">
      <SearchIcon className="fill-blue-500" />
    </span>
    <input type="text" placeholder="Search GitHub username" className="h-[56px] flex-1 py-2 rounded-lg bg-transparent placeholder:text-white  text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    <button className="bg-blue-500 rounded-lg py-4 px-4 font-bold text-white">Search</button>
  </form>
  )
}

export default FormSearchUser