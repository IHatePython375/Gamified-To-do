import React, {useState, useContext, createContext} from 'react'

function GetXP() {
    return {
        'Homework': {xp: 250},
        'Chores': {xp: 100},
        'Work': {xp: 300}
    }
}

const preloadedCategories = [
    {name: 'Homework', color: '#a50000b3', xp: 250},
    {name: 'Chores', color: '#620096b3', xp: 100},
    {name: 'Work', color: '#073604b3', xp: 300}
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