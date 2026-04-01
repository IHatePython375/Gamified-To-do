import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, completeTask, uncompleteTask, deleteTask } from './api'

const TaskContext = createContext()

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) loadTasks()
    }, [])

    async function loadTasks() {
        try {
            const data = await getTasks()
            setTasks(data)
        } catch (err) {
            console.error('Failed to load tasks:', err)
        }
    }

    async function addTask(newTask) {
        try {
            const task = await createTask(newTask)
            setTasks(prev => [...prev, task])
        } catch (err) {
            console.error('Failed to add task:', err)
        }
    }

    async function toggleTask(id) {
        const task = tasks.find(t => t.id === id)
        if (!task) return
        try {
            if (task.is_completed) {
                const data = await uncompleteTask(id)
                setTasks(prev => prev.map(t => t.id === id ? data.task : t))
            } else {
                const data = await completeTask(id)
                setTasks(prev => prev.map(t => t.id === id ? data.task : t))
            }
        } catch (err) {
            console.error('Failed to toggle task:', err)
        }
    }

    async function updateTaskById(id, updates) {
        try {
            const task = await updateTask(id, updates)
            setTasks(prev => prev.map(t => t.id === id ? task : t))
        } catch (err) {
            console.error('Failed to update task:', err)
        }
    }

    async function deleteTaskById(id) {
        try {
            await deleteTask(id)
            setTasks(prev => prev.filter(t => t.id !== id))
        } catch (err) {
            console.error('Failed to delete task:', err)
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, loadTasks, addTask, toggleTask, updateTask: updateTaskById, deleteTask: deleteTaskById }}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
    return useContext(TaskContext)
}
