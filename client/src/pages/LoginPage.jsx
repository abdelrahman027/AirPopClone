import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../context/userContext";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notify, setNotify] = useState('');
    const [redirect, setRedirect] = useState(false)
    const { setUser } = useContext(UserContext)
    const handleLogin = async (e) => {
        e.preventDefault();
        try
        {
            const response = await axios.post('/login', { email, password })
            setUser(response.data)
            setRedirect(true)
        }
        catch (err)
        {
            console.log(err)
            setNotify(toast.error("Error Notification !", {
                position: toast.POSITION.TOP_CENTER
            }))
        }
    }
    if (redirect)
    {
        return (<Navigate to='/home' />)
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-10">
                <h1 className="text-3xl text-center">Login</h1>
                <form action="" className="max-w-lg mx-auto mt-6" onSubmit={handleLogin}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        className="w-full border px-2 py-4 rounded-lg mb-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className="w-full border px-2 py-4 rounded-lg mb-6"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn_primary bg-primary" type="submit" onClick={() => notify}>Login</button>
                    <ToastContainer />
                    <div className="text-center text-gray-400">
                        Don&apos;t have account yet?
                        <Link className='underline text-black text-sm hover:no-underline font-semibold' to='/register' > Register Now</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginPage