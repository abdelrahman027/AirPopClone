/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});


// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {

        if (!user)
        {
            axios.get('/profile').then(response => setUser(response.data)).then(() => setReady(true)).catch(err => console.log(err))


        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, ready }} >
            {children}
        </UserContext.Provider>

    );
}