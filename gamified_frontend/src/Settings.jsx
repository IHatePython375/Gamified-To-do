/*Color palette implementation adapted from here: https://www.educative.io/answers/how-to-add-color-picker-in-react*/

import React, {useState} from 'react';
import './Settings.css';
import DrawTopbar from './components/topbar.jsx';
import ProgressBar from './components/progress_bar.jsx';
import GetDate from './track_tasks.jsx'
import DrawTodayPgWidget from './components/taskWidget.jsx';
import { XPPerTask } from './components/xpPerTask.jsx';
import DrawAddTaskButton from './components/addTaskButton.jsx';
import { applyTheme, darkTheme, lightTheme } from './themeSettings.js';
import {ColorPicker, useColor} from 'react-color-palette';
import 'react-color-palette/css';
import './components/modifyCategory.css'
import { useCategories, useCategoryColors } from './components/categoryHelper.jsx';
import { useAccount } from './components/storeAccountInfo.jsx';

function ChangeCategoryTagColor({initialColor, onColorChange}) {
    const [color, setColor] = useColor(initialColor || '#000000')

    return (
        <ColorPicker 
            color={color}
            onChange={(c) => {
                setColor(c)
                onColorChange(c.hex)
            }}
        />
    )
}

function CategoryList() {
    const { categories: contextCategories, saveCategories } = useCategories()
    const { getCategoryColorBg, getCategoryColorBorder } = useCategoryColors()
    const [categoryList, setCategoryList] = React.useState(contextCategories.map(c => c.name))
    const [openIndex, setOpenIndex] = React.useState(null)
    const categoryRefs = React.useRef([])
    const [editCategoryName, setCategoryName] = React.useState('')
    const [colorPaletteOpen, setColorPaletteOpen] = React.useState(false)
    const [editXP, setXP] = React.useState("100")
    const [categoryColors, setCategoryColors] = React.useState(
        Object.fromEntries(contextCategories.map(c => [c.name, c.color]))
    )
    const [categoryXP, setCategoryXP] = React.useState(
        Object.fromEntries(contextCategories.map(c => [c.name, c.xp]))
    )

    function handleSave(index) {
        const oldCategory = categoryList[index]
        const newCategory = editCategoryName.trim() || oldCategory
        const updatedCategoryList = categoryList.map((c, i) => {
            if (i == index) {
                return newCategory
            }
            else {
                return c
            }
        })
        const updatedColors = {...categoryColors, [newCategory]: categoryColors[oldCategory]}
        const updatedXP = {...categoryXP, [newCategory]: parseInt(editXP)}
        if (newCategory != oldCategory) {
            delete updatedColors[oldCategory]
            delete updatedXP[oldCategory]
        }
        setCategoryList(updatedCategoryList)
        setCategoryColors(updatedColors)
        setCategoryXP(updatedXP)
        saveCategories(updatedCategoryList.map(name => ({
            name,
            color: updatedColors[name],
            xp: updatedXP[name]
        })))
        setOpenIndex(null)
    }

    function handleCancel() {
        setColorPaletteOpen(false)
        setOpenIndex(null)
    }

    function handleDelete(index) {
        const deletedCategory = categoryList[index]
        setCategoryList(categoryList.filter((_, i) => i !== index))
        setCategoryColors(prev => {
            const updated = {...prev}
            delete updated[deletedCategory]
            return updated
        })
        setOpenIndex(null)
    }

    React.useEffect(() => {
        function close(e) {
            if (openIndex != null && categoryRefs.current[openIndex] && !categoryRefs.current[openIndex].contains(e.target)) {
                setOpenIndex(null)
            }
        }
        if (openIndex != null) {
            window.addEventListener('click', close)
        }
        return () => window.removeEventListener('click', close)
    }, [openIndex])

    return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        marginTop: '12px',
        marginBottom: '12px',
        overflow: 'visible'
    }}>
        {categoryList.map((category, index) => (
            <div key={index} style={{ position: 'relative', overflow: 'visible' }} 
                ref={el => categoryRefs.current[index] = el}>
                <button
                    onClick={() => {
                        if (openIndex == index) {
                            setOpenIndex(null)
                        }
                        else {
                            setOpenIndex(index)
                            setCategoryName(category)
                            setColorPaletteOpen(false)
                            if (categoryXP[category] != null) {
                                setXP(categoryXP[category].toString())
                            } else {
                                setXP("100")
                            }
                        }
                    }}
                    style={{
                        background: categoryColors[category] || getCategoryColorBg(category),
                        border: `2px solid ${getCategoryColorBorder(category)}`,
                        borderRadius: '8px',
                        padding: '4px 12px',
                        minWidth: '100%',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: 'var(--text-h)'
                    }}>
                    {category}
                </button>
                {openIndex == index && (
                    <div className="modifyCategoryMenu">
                        <div style={{
                            fontSize: '20px',
                            color: 'var(--text-h)',
                            padding: '4px 8px',
                        }}>
                            <u>Category:</u>
                            <input 
                                type="text"
                                placeholder="New Category"
                                value={editCategoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                style={{
                                    fontSize: '20px',
                                    color: 'var(--text-h)',
                                    padding: '2px 8px',
                                    marginLeft: '8px',
                                    background: 'var(--xpWidgetBg)',
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '50%'
                                }}
                            />
                        </div>
                        <div style={{ 
                            fontSize: '20px', 
                            color: 'var(--text-h)', 
                            padding: '4px 8px'
                            }}>
                                <u>Tag Color:</u>
                            <div style={{
                                position: 'relative',
                                display: 'inline-block',
                                marginLeft: '8px'
                            }}>
                                <button 
                                onClick={() => setColorPaletteOpen(!colorPaletteOpen)}
                                style={{
                                    background: categoryColors[category] || getCategoryColorBg(category),
                                    border: `2px solid ${getCategoryColorBorder(category)}`,
                                    borderRadius: '8px',
                                    width: '126px',
                                    height: '22px',
                                    cursor: 'pointer',
                                }} />
                                {colorPaletteOpen && (
                                    <div style={{ 
                                        position: 'absolute',
                                        top: '-56px',
                                        left: '100%',
                                        marginLeft: '18px',
                                        zIndex: 100
                                    }}>
                                        <ChangeCategoryTagColor 
                                            key={category}
                                            initialColor={categoryColors[category] || getCategoryColorBg(category)}
                                            onColorChange={(hex) => setCategoryColors(prev => ({...prev, [category]: hex}))} 
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{
                            fontSize: '20px',
                            color: 'var(--text-h)',
                            padding: '4px 8px',
                        }}>
                            <u>XP:</u>  +
                            <input 
                                type="number"
                                placeholder="100"
                                value={editXP}
                                onChange={(e) => setXP(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        if (editXP == "") {
                                            setXP("100")
                                            return
                                        }

                                        let xpVal = parseInt(editXP)
                                        if (xpVal != null) {
                                            if (xpVal < 50) {
                                                xpVal = 50
                                            }
                                            if (xpVal > 500) {
                                                xpVal = 500
                                            }
                                            setXP(xpVal.toString())
                                        }
                                    }
                                }}
                                min={50}
                                max={500}
                                style={{
                                    fontSize: '20px',
                                    color: 'var(--text-h)',
                                    padding: '2px 8px',
                                    background: 'var(--xpWidgetBg)',
                                    border: '1px solid #555',
                                    borderRadius: '4px',
                                    width: '50%'
                                }}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '18px'
                        }}>
                            <button onClick={() => 
                                handleSave(index)} 
                            style={{
                                borderRadius: '8px',
                                block: 'inline',
                                border: '2px solid var(--accent)',
                                padding: '0 12px',
                                width: '106px',
                                fontSize: '20px',
                                cursor: 'pointer',
                                color: 'var(--text-h)',
                                boxSizing: 'border-box',
                                background: 'var(--accent)',
                                marginLeft: '8px',
                                alignItems: 'center'
                            }}>
                                Save
                            </button>
                            <button onClick={handleCancel} style={{
                                borderRadius: '8px',
                                block: 'inline',
                                border: '2px solid #555',
                                padding: '0 12px',
                                width: '106px',
                                fontSize: '20px',
                                cursor: 'pointer',
                                color: 'var(--text-h)',
                                boxSizing: 'border-box',
                                background: '#555',
                                marginRight: '2px',
                                marginLeft: '12px',
                                alignItems: 'center'
                            }}>
                                Cancel
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                handleDelete(index)
                            }}
                            style={{ 
                                borderRadius: '8px', 
                                border: '2px solid #9e0000', 
                                width: '94%', 
                                fontSize: '18px', 
                                cursor: 'pointer', 
                                color: 'var(--text-h)', 
                                background: '#ff0000', 
                                marginTop: '4px',
                                marginBottom: '4px',
                                marginLeft: '8px'
                                }}>
                                Delete
                        </button>
                    </div>
                )}
            </div>
        ))}
        <button
            onClick={() => {
                const newCategory = 'New Category'
                setCategoryList([...categoryList, newCategory])
                setCategoryColors({...categoryColors, [newCategory]: '#888888'})
                setCategoryXP(prev => ({ ...prev, [newCategory]: 100 }))
            }}
            style={{ 
                marginTop: '8px', 
                width: '100%', 
                fontSize: '20px', 
                borderRadius: '8px', 
                border: '2px solid var(--border)', 
                background: 'var(--accent)', 
                color: 'var(--text-h)', 
                padding: '4px 12px', 
                cursor: 'pointer' 
            }}>
            + Add Category
        </button>
    </div>
    )
}

function useAccountChanges() {
    const { username } = useAccount()
    const [newUsername, setUsername] = useState(username)
    const [newPassword, setPassword] = useState('')
    const [saved, setSaved] = useState(false)

    function saveAccountChanges() {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    function cancelAccountChanges() {
        setUsername(username)
        setPassword('')
    }

    return { newUsername, setUsername, newPassword, setPassword, saved, saveAccountChanges, cancelAccountChanges }
}


export default function Settings() {
    const {newUsername, setUsername, newPassword, setPassword, saved, saveAccountChanges, cancelAccountChanges} = useAccountChanges()
    const [darkApplied, setDarkApplied] = useState(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme == 'dark') {
            return true
        }
        if (savedTheme == 'light') {
            return false
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    function toggleTheme() {
        let next
        if (darkApplied == true) {
            next = lightTheme
            localStorage.setItem('theme', 'light')
        }
        else {
            next = darkTheme
            localStorage.setItem('theme', 'dark')
        }
        applyTheme(next)
        setDarkApplied(!darkApplied)
    }

    return (
        <div className="app">
            <DrawTopbar page="Settings"/>
            <main id="center">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'left',
                    gap: '16px',
                    width: '100%',
                    marginTop: '12px',
                    color: 'var(--text-h)',
                    fontSize: '32px'
                }}>
                    <u>Theme</u>
                </div>
                <button 
                onClick={toggleTheme}
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    width: '20%',
                    marginTop: '12px',
                    fontSize: '28px',
                    justifyContent: 'center',
                    backgroundColor: 'var(--button-bg)',
                    color: 'var(--text-h)',
                    borderRadius: '8px',
                    border: '1px solid var(--widget-color)'
                }}>
                    {(() => {
                        if (darkApplied) {
                            return 'Dark';
                        } else {
                            return 'Light';
                        }
                    })()}
                </button>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'left',
                    gap: '16px',
                    width: '100%',
                    marginTop: '64px',
                    color: 'var(--text-h)',
                    fontSize: '32px'
                }}>
                    <u>Task Categories</u>
                </div>
                <div style={{
                    background: 'var(--widgetBackground)',
                    border: '2px solid var(--border)',
                    width: '40%',
                    marginTop: '18px',
                    padding: '0 8px',
                    overflow: 'visible'
                }}>
                    <CategoryList />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'left',
                    gap: '16px',
                    width: '100%',
                    marginTop: '64px',
                    color: 'var(--text-h)',
                    fontSize: '32px'
                }}>
                    <u>Account Information</u>
                </div>
                <div style={{
                    fontSize: '24px',
                    color: 'var(--text-h)',
                    marginTop: '24px'                    
                }}>
                    <u>Username:</u>
                    <input 
                        type="text"
                        placeholder="Username"
                        value={newUsername}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            fontSize: '20px',
                            color: 'var(--text-h)',
                            padding: '2px 8px',
                            marginLeft: '8px',
                            background: 'var(--xpWidgetBg)',
                            border: '1px solid #555',
                            borderRadius: '4px',
                            width: '50%'
                        }}
                    />
                </div>
                <div style={{
                    fontSize: '24px',
                    color: 'var(--text-h)',
                    marginTop: '24px'                    
                }}>
                    <u>Password:</u>
                    <input 
                        type="text"
                        placeholder="Password"
                        value={newPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            fontSize: '20px',
                            color: 'var(--text-h)',
                            padding: '2px 8px',
                            marginLeft: '16px',
                            background: 'var(--xpWidgetBg)',
                            border: '1px solid #555',
                            borderRadius: '4px',
                            width: '50%'
                        }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '18px'
                }}>
                    <button onClick={saveAccountChanges} 
                    style={{
                        borderRadius: '8px',
                        block: 'inline',
                        border: '2px solid var(--accent)',
                        padding: '0 12px',
                        width: '20%',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: 'var(--text-h)',
                        boxSizing: 'border-box',
                        background: 'var(--accent)',
                        alignItems: 'center',
                        marginTop: '32px'
                    }}>
                        Save
                    </button>
                    <button onClick={cancelAccountChanges} 
                    style={{
                        borderRadius: '8px',
                        block: 'inline',
                        border: '2px solid #555',
                        padding: '0 12px',
                        width: '20%',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: 'var(--text-h)',
                        boxSizing: 'border-box',
                        background: '#555',
                        marginRight: '2px',
                        marginLeft: '12px',
                        alignItems: 'center',
                        marginTop: '32px'
                    }}>
                        Cancel
                    </button>
                </div>
            </main>
        </div>
    );
}