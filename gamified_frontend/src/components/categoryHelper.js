function GetXP() {
    return {
        'Task 1': {xp: 250, type: 'Homework'},
        'Task 2': {xp: 100, type: 'Chores'},
        'Task 3': {xp: 300, type: 'Work'}
    }
}

export function getCategoryColorBorder(taskName) {
    const xpMap = GetXP()
    let category
    if (xpMap[taskName] != null) {
        category = xpMap[taskName].type
    }
    else {
        category = 'General'
    }

    let color
    if (category == 'Homework') {
        color = 'rgb(165, 0, 0)'
    }
    else if (category == 'Chores') {
        color = 'rgb(98, 0, 150)'
    }
    else if (category == 'Work') {
        color = 'rgb(7, 54, 4)'
    }
    else {
        color = 'rgb(56, 56, 56)'
    }

    return color
}

export function getCategoryColorBg(taskName) {
    const xpMap = GetXP()
    let category
    if (xpMap[taskName] != null) {
        category = xpMap[taskName].type
    }
    else {
        category = 'General'
    }

    let color
    if (category == 'Homework') {
        color = 'rgba(165, 0, 0, 0.7)'
    }
    else if (category == 'Chores') {
        color = 'rgba(98, 0, 150, 0.7)'
    }
    else if (category == 'Work') {
        color = 'rgba(7, 54, 4, 0.7)'
    }
    else {
        color = 'rgba(56, 56, 56, 0.7)'
    }

    return color
}