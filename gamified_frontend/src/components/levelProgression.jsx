import {useTasks} from '../TaskContext.jsx'
import {useCategories} from './categoryHelper.jsx'

// function getLevelXP(level) {
//     return 1000 + (level - 1) * 1250 + 125 * (level - 1) * (level - 2)
// }

// export function calculateLevel(currentXP) {
//     let level = 1
//     let overallXP = 0
//     while (overallXP + getLevelXP(level) <= currentXP) {
//         overallXP += getLevelXP(level)
//         level++
//     }

//     return {
//         level,
//         xpIntoLevel: currentXP - overallXP,
//         xpForLevel: getLevelXP(level)
//     }
// }

//backend way

const LEVEL_THRESHOLDS = [0, 0, 500, 1200, 2100, 3500, 5500, 8000, 11000, 15000, 20000]

export function calculateLevel(currentXP) {
    let level = 1
    for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
        if (currentXP >= LEVEL_THRESHOLDS[i]) level = i
        else break
    }
    const currentThreshold = LEVEL_THRESHOLDS[level] || 0
    const nextThreshold = LEVEL_THRESHOLDS[level + 1] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
    return {
        level,
        xpIntoLevel: currentXP - currentThreshold,
        xpForLevel: nextThreshold - currentThreshold
    }
}


// export const levelBadges = [
//     'Bronze I',
//     'Bronze II',
//     'Bronze III',
//     'Bronze IV',
//     'Silver I',
//     'Silver II',
//     'Silver III',
//     'Silver IV',
//     'Gold I',
//     'Gold II',
//     'Gold III',
//     'Gold IV',
//     'Platinum I',
//     'Platinum II',
//     'Platinum III',
//     'Platinum IV',
//     'Diamond I',
//     'Diamond II',
//     'Diamond III',
//     'Diamond IV',
// ]

//back end way

export const levelBadges = [
    'Bronze I',
    'Bronze II',
    'Bronze III',
    'Silver I',
    'Silver II',
    'Silver III',
    'Gold I',
    'Gold II',
    'Platinum I',
    'Diamond',
]


export function useTotalXP() {
    const {tasks} = useTasks()
    const {categories} = useCategories()

    const totalXP = tasks.filter(t => t.is_completed).reduce((sum, t) => {
        const category = categories.find(c => c.name == t.category)
        if (category) {
            return sum + category.xp
        }
        else {
            return sum + 100
        }
    }, 0)

    return totalXP
}