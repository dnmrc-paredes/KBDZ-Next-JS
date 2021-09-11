import React, { createContext, useContext, useState, useEffect, FC } from "react";
import { onAuthStateChanged, User } from "@firebase/auth";

// Firebase
import { firebaseAuth } from "../firebase/client";

const AuthContext = createContext({})

export const AuthProvider: FC = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>()
    const [theUser, setTheUser] = useState<User>()

    useEffect(() => {
        const unsub = onAuthStateChanged(firebaseAuth, async (user) => {

            if (!user || !user.emailVerified) {
                setTheUser(undefined)
                setIsLoggedIn(false)
                return 
            }

            setTheUser(user)
            setIsLoggedIn(true)

        })

        return unsub
    }, [])

    const value = {
        user: theUser,
        isAuth: isLoggedIn
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)