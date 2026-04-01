import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    function addTask(newTask) {
        setTasks(prev => [...prev, { ...newTask, checked: false, id: Date.now() }]);
    }

    function toggleTask(id) {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
    }

    function updateTask(id, updates) {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }

    function deleteTask(id) {
        setTasks(prev => prev.filter(t => t.id !== id));
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}
