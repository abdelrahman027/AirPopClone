import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [notify, setNotify] = useState(null)
    const [redirect, setRedirect] = useState(null)
    const handleRegister = async (e) => {
        e.preventDefault();
        try
        {
            await axios.post('/register', {
                username,
                email,
                password
            })
            setNotify(toast.success("Success Notification !", {
                position: toast.POSITION.TOP_CENTER
            }))
            setRedirect('/login')
        }
        catch (err)
        {
            console.log(err)
            setNotify(toast.error("Error Notification !", {
                position: toast.POSITION.TOP_CENTER
            }))
        }
    };

    if (redirect)
    {
        return (
            <Navigate to={redirect} />
        )
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-10">
                <h1 className="text-3xl text-center">Register</h1>
                <form action="" className="max-w-lg mx-auto mt-6" onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        className="w-full border px-2 py-4 rounded-lg mb-6"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        className="w-full border px-2 py-4 rounded-lg mb-6"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className="w-full border px-2 py-4 rounded-lg mb-6"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="btn_primary bg-primary" onClick={() => notify} type="submit">Register</button>
                    <ToastContainer />
                    <div className="text-center text-gray-400">
                        Already a member ?
                        <Link className='underline text-black text-sm hover:no-underline font-semibold' to='/login' >Sign in</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage