import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

function GetXP() {
    return {
        'Homework': {xp: 250},
        'Chores': {xp: 100},
        'Work': {xp: 300}
    }
}

export function XPPerTask({taskCategory}) {
    const xpMap = GetXP()
    let xp
    if (xpMap[taskCategory] != null) {
        xp = xpMap[taskCategory].xp
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