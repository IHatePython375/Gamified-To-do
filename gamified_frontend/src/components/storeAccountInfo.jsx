import React, { useState, useContext, createContext, useEffect } from 'react'
import { login, register, logout } from '../api'

const AccountContext = createContext()

export function AccountInfo({ children }) {
    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedUsername = localStorage.getItem('username')
        if (savedUsername) setUsername(savedUsername)
    }, [])

    async function handleLogin(username, password) {
        const userData = await login(username, password)
        setUser(userData)
        setUsername(userData.username)
        localStorage.setItem('username', userData.username)
        return userData
    }

    async function handleRegister(username, password) {
        const userData = await register(username, password)
        setUser(userData)
        setUsername(userData.username)
        localStorage.setItem('username', userData.username)
        return userData
    }

    function handleLogout() {
        logout()
        setUser(null)
        setUsername('')
        localStorage.removeItem('username')
    }

    return (
        <AccountContext.Provider value={{ username, user, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AccountContext.Provider>
    )
}

export function useAccount() {
    return useContext(AccountContext)
}
