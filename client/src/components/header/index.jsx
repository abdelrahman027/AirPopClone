import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../context/userContext"

const Header = () => {
    const { user } = useContext(UserContext)
    return (
        <>
            <div className="py-2 md:py-3 flex justify-between items-center">
                {/* logo */}
                <Link to={'/home'} className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-5 h-5 md:w-9 md:h-9 -rotate-90 text-primary font-bold">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <h2 className="font-bold text-primary text-xs md:text-xl">Air PoP</h2>
                </Link>
                {/* Search menu */}
                <div className="flex  text-sm md:text-base border px-2 py-1 md:px-4 md:py-3 rounded-full gap-1 md:gap-2 shadow-sm shadow-secondary items-center">
                    <div className="text-xs border-r pr-2 md:text-base">Anywhere</div>
                    <div className=" border-secondary"></div>
                    <div className="text-xs border-r pr-2 md:text-base">Any week</div>
                    <div className="border-l border-secondary"></div>
                    <div className="text-xs md:text-base">add guests</div>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-primary p-1 rounded-full text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
                {/* User menu */}
                <Link to={user ? '/account' : '/login'} className="hidden md:flex border px-1 py-0.5 rounded-full gap-1 items-center active:scale-95 hover:shadow-md shadow-gray-200 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-6 md:h-6 text-secondary">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {user && (<div>{user.username}</div>)}
                </Link>


            </div>
            <div className="w-1/2 mx-auto md:hidden block">
                {/* User mobile menu */}
                <Link to={user ? '/account' : '/login'} className="flex  border px-1 py-0.5 rounded-full gap-1 items-center active:scale-95 hover:shadow-md shadow-gray-200 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-6 md:h-6 text-secondary">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {user && (<div>{user.username}</div>)}
                </Link>
            </div>
        </>
    )
}

export default Header