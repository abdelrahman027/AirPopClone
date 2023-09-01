import { Fragment, useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import axios from "axios"
import { Navigate } from "react-router-dom"
import AccountNav from "../AccountNav"


const Profile = () => {
    const [redirect, setRedirect] = useState(null)
    const { user, setUser, ready } = useContext(UserContext)
    const handleLogout = async () => {
        await axios.post('/logout')
        setRedirect('/login')
        setUser(null)
    };

    if (!ready)
    {
        return 'Loading...';
    }

    if (ready && !user && !redirect)
    {
        return <Navigate to={'/login'} />
    }
    if (redirect)
    {
        return (<Navigate to={redirect} />)
    }
    return (
        <Fragment >
            <AccountNav />
            <div className="flex flex-col 2-full items-center justify-center gap-8">
                <h2 className="font-bold">
                    Logged in as  <span className="text-primary font-normal">{user.username}</span> ({user.email})
                </h2>
                <button className="btn_primary max-w-sm" onClick={handleLogout} >Logout</button>
            </div>
        </Fragment>
    )
}

export default Profile