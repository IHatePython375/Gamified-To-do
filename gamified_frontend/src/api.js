const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function getToken() {
    return localStorage.getItem('token')
}

export async function apiFetch(path, options = {}) {
    const token = getToken()
    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Request failed')
    return data
}

export async function register(username, password) {
    const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })
    localStorage.setItem('token', data.token)
    return data.user
}

export async function login(username, password) {
    const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })
    localStorage.setItem('token', data.token)
    return data.user
}

export function logout() {
    localStorage.removeItem('token')
}

export async function getTasks() {
    const data = await apiFetch('/api/tasks')
    return data.tasks
}

export async function createTask(task) {
    const data = await apiFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
    })
    return data.task
}

export async function updateTask(id, updates) {
    const data = await apiFetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
    })
    return data.task
}

export async function completeTask(id) {
    const data = await apiFetch(`/api/tasks/${id}/complete`, { method: 'PATCH' })
    return data
}

export async function uncompleteTask(id) {
    const data = await apiFetch(`/api/tasks/${id}/uncomplete`, { method: 'PATCH' })
    return data
}

export async function deleteTask(id) {
    return await apiFetch(`/api/tasks/${id}`, { method: 'DELETE' })
}

export async function getProgress() {
    return await apiFetch('/api/progress')
}

