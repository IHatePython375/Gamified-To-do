import React, {useState, useContext, createContext} from 'react'

function GetXP() {
    return {
        'homework': {xp: 250},
        'chores': {xp: 100},
        'work': {xp: 300},
        'personal': {xp: 150}
    }
}

const preloadedCategories = [
    {name: 'homework', color: '#a50000b3', xp: 250},
    {name: 'chores', color: '#620096b3', xp: 100},
    {name: 'work', color: '#073604b3', xp: 300},
    {name: 'personal', color: '#1a73e8b3', xp: 150}
]

const CategoryContext = createContext()

export function CategoryProvider({children}) {
    const [categories, setCategories] = useState(() => {
        const savedCategories = localStorage.getItem('categories')
        if (savedCategories) {
            return JSON.parse(savedCategories)
        }
        else {
            return preloadedCategories
        }
    })

    function saveCategories(changed) {
        setCategories(changed)
        localStorage.setItem('categories', JSON.stringify(changed))
    }

    return (
        <CategoryContext.Provider value={{categories, saveCategories}}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategories() {
    return useContext(CategoryContext)
}

export function useCategoryColors() {
    const {categories} = useCategories()

    function getCategoryColorBorder(taskCategory) {
        const found = categories.find(c => c.name == taskCategory)
        let bgColor
        if (found) {
            return found.color
        }
        else {
            return '#888888'
        }
    }

    function getCategoryColorBg(taskCategory) {
        const found = categories.find(c => c.name == taskCategory)
        let bgColor
        if (found) {
            return found.color
        }
        else {
            return '#555555'
        }
    }

    return {getCategoryColorBg, getCategoryColorBorder}
}