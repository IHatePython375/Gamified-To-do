import {useTasks} from '../TaskContext.jsx'
import {useCategories} from './categoryHelper.jsx'

function getLevelXP(level) {
    return 1000 + (level - 1) * 1250 + 125 * (level - 1) * (level - 2)
}

export function calculateLevel(currentXP) {
    let level = 1
    let overallXP = 0
    while (overallXP + getLevelXP(level) <= currentXP) {
        overallXP += getLevelXP(level)
        level++
    }

    return {
        level,
        xpIntoLevel: currentXP - overallXP,
        xpForLevel: getLevelXP(level)
    }
}

export const levelBadges = [
    'Bronze I',
    'Bronze II',
    'Bronze III',
    'Bronze IV',
    'Silver I',
    'Silver II',
    'Silver III',
    'Silver IV',
    'Gold I',
    'Gold II',
    'Gold III',
    'Gold IV',
    'Platinum I',
    'Platinum II',
    'Platinum III',
    'Platinum IV',
    'Diamond I',
    'Diamond II',
    'Diamond III',
    'Diamond IV',
]

export function useTotalXP() {
    const {tasks} = useTasks()
    const {categories} = useCategories()

    const totalXP = tasks.filter(t => t.checked).reduce((sum, t) => {
        const category = categories.find(c => c.name == t.type)
        if (category) {
            return sum + category.xp
        }
        else {
            return sum + 100
        }
    }, 0)

    return totalXP
}