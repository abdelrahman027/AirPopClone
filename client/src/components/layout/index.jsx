import { Outlet } from "react-router-dom"
import Header from "../header"

const Layout = () => {
    return (
        <div className="px-6 md:px-14 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout