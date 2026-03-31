import React, {useState, useContext, createContext} from 'react'

const AccountContext = createContext()

export function AccountInfo({children}) {
    const [username, setUsername] = useState(() =>
        localStorage.getItem('username') || 'TestName'
    )

    function saveUsername(username) {
        setUsername(username)
        localStorage.setItem('username', username)
    }

    function savePassword(password) {
        localStorage.setItem('password', password)
    }

    function getPassword() {
        return localStorage.getItem('password') || ''
    }

    return (
        <AccountContext.Provider value={{username, saveUsername, savePassword, getPassword}}>
            {children}
        </AccountContext.Provider>
    )
}

export function useAccount() {
    return useContext(AccountContext)
}