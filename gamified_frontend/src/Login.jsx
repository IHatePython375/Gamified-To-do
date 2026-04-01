import React, { useState } from 'react'
import { useAccount } from './components/storeAccountInfo.jsx'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const { handleLogin, handleRegister } = useAccount()
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        try {
            if (isRegister) {
                await handleRegister(username, password)
            } else {
                await handleLogin(username, password)
            }
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)' }}>
            <h1 style={{ color: 'var(--text-h)', fontSize: '36px', marginBottom: '24px' }}>
                {isRegister ? 'Register' : 'Login'}
            </h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ padding: '8px', fontSize: '20px', borderRadius: '8px', border: '1px solid #555', background: 'var(--xpWidgetBg)', color: 'var(--text-h)' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ padding: '8px', fontSize: '20px', borderRadius: '8px', border: '1px solid #555', background: 'var(--xpWidgetBg)', color: 'var(--text-h)' }}
                />
                {error && <span style={{ color: 'red', fontSize: '16px' }}>{error}</span>}
                <button type="submit" style={{ padding: '8px', fontSize: '20px', borderRadius: '8px', background: 'var(--accent)', border: 'none', color: 'var(--text-h)', cursor: 'pointer' }}>
                    {isRegister ? 'Register' : 'Login'}
                </button>
            </form>
            <button
                onClick={() => { setIsRegister(!isRegister); setError('') }}
                style={{ marginTop: '16px', background: 'none', border: 'none', color: 'var(--text-h)', fontSize: '16px', cursor: 'pointer', textDecoration: 'underline' }}>
                {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
        </div>
    )
}
