import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

function GetXP() {
    return {
        'Task 1': {xp: 250, type: 'Homework'},
        'Task 2': {xp: 100, type: 'Chores'},
        'Task 3': {xp: 300, type: 'Work'}
    }
}

export function XPPerTask({taskName}) {
    const xpMap = GetXP()
    let xp
    if (xpMap[taskName] != null) {
        xp = xpMap[taskName].xp
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

export function TaskType({taskName}) {
    const xpMap = GetXP()
    let taskCategory
    if (xpMap[taskName] != null) {
        taskCategory = xpMap[taskName].type;
    } else {
        taskCategory = 'General';
    }

    let color
    if (taskCategory == 'Homework') {
        color = 'rgb(255, 0, 0)'
    }
    else if (taskCategory == 'Chores') {
        color = 'rgb(166, 0, 255)'
    }
    else if (taskCategory == 'Work') {
        color = 'rgb(11, 95, 7)'
    }
    else {
        color = 'rgb(107, 107, 107)'
    }

    return (
        <span style={{color: 'var(--text-h)'}}>
            {taskCategory}
        </span>
    )
}