import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { useCategories } from './categoryHelper.jsx'

function GetXP() {
    return {
        'Homework': {xp: 250},
        'Chores': {xp: 100},
        'Work': {xp: 300}
    }
}

export function XPPerTask({taskCategory}) {
    const {categories} = useCategories()
    const found = categories.find(c => c.name == taskCategory)
    let xp
    if (found) {
        xp = found.xp
    }
    else {
        xp = 100
    }

    return (
        <span style={{
            color: 'var(--accent)',
        }}>
            +{xp} XP
        </span>
    )
}

export function TaskType({taskCategory}) {
    return (
        <span style={{color: 'var(--text-h)'}}>
            {taskCategory}
        </span>
    )
}