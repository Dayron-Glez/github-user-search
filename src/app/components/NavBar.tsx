import SunnyIcon from "./icons/SunnyIcon"

const NavBar = () => {
  return (
    <header className="flex items-center space-x-2 mb-10 text-white">
        <h1 className="flex-grow text-3xl font-bold ">devfinder</h1>
        <span className="uppercase">Light</span>
        <button>
            <SunnyIcon fill="white" width={20} height={20}/>
        </button>
    </header>
  )
}

export default NavBar