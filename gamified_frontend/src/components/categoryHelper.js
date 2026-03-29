function GetXP() {
    return {
        'Homework': {xp: 250},
        'Chores': {xp: 100},
        'Work': {xp: 300}
    }
}

export function getCategoryColorBorder(taskCategory) {
    let color
    if (taskCategory == 'Homework') {
        color = 'rgb(165, 0, 0)'
    }
    else if (taskCategory == 'Chores') {
        color = 'rgb(98, 0, 150)'
    }
    else if (taskCategory == 'Work') {
        color = 'rgb(7, 54, 4)'
    }
    else {
        color = 'rgb(56, 56, 56)'
    }

    return color
}

export function getCategoryColorBg(taskCategory) {
    let color
    if (taskCategory == 'Homework') {
        color = 'rgba(165, 0, 0, 0.7)'
    }
    else if (taskCategory == 'Chores') {
        color = 'rgba(98, 0, 150, 0.7)'
    }
    else if (taskCategory == 'Work') {
        color = 'rgba(7, 54, 4, 0.7)'
    }
    else {
        color = 'rgba(56, 56, 56, 0.7)'
    }

    return color
}