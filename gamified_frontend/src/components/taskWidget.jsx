import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { XPPerTask, TaskType } from './xpPerTask'
import { getCategoryColorBg, getCategoryColorBorder } from './categoryHelper'
import DrawAddTaskButton from './addTaskButton.jsx'
import GetDate from '../track_tasks.jsx'
import './modifyTaskButton.css'

const categories = ['Homework', 'Chores', 'Work']

/*Remove pre-loaded tasks after designing rest of interface, used just for */
export default function DrawTodayPgWidget({tasks: preLoadedTasks=[]}) {
    const [tasks, setTasks] = React.useState(preLoadedTasks)
    const [editingIndex, setEditingIndex] = React.useState(null)
    const [taskName, setTaskName] = React.useState('')
    const [error, setError] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('General')
    const [categoryOpen, setCategoryOpen] = React.useState(false)

    function addTaskToList(newTask) {
        setTasks([...tasks, {...newTask, checked: false}])
    }


    function toggleTask(index) {
        setTasks(tasks.map((task, i) => {
            if (i == index) {
                return {...task, checked: !task.checked}
            }
            else {
                return task
            }
        }))
    }

    function changeCategory(index, newCategory) {
        setTasks(tasks.map((task, i) => {
            if (i == index) {
                return {...task, type: newCategory}
            }
            else {
                return task
            }
        }))
        setEditingIndex(null)
    }

    function handleSave(index) {
        const updatedName = taskName.trim() || tasks[index].name
        setTasks(tasks.map((task, i) => {
            if (i == index) {
                return { ...task, name: updatedName, type: selectedCategory }
            } else {
                return task
            }
        }))
        setTaskName('')
        setSelectedCategory('General')
        setError('')
        setEditingIndex(null)
    }

    function handleCancel() {
        setTaskName('')
        setSelectedCategory('General')
        setError('')
        setCategoryOpen(false)
        setEditingIndex(null)
    }

    function handleDelete(index) {
        setTasks(tasks.filter((_, i) => i !== index))
        setEditingIndex(null)
    }

    return (
        <div style={{ width: '100%', position: 'relative', zIndex: 40, overflow: 'visible' }}>
            <div style={{
                width: '100%',
                marginTop: '32px',
                marginBottom: '24px',
                minHeight: 'auto',
                background: '#222',
                border: '2px solid #555',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxSizing: 'border-box',
                overflow: 'visible'
            }}>
                {tasks.map((task, index) => {
                    console.log('task value: ', task)
                    return (
                    <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: '12px',
                        marginLeft: '8px',
                        width: '100%',
                    }}>
                        <label style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            cursor: 'pointer', 
                            fontSize: '28px',
                            width: '65%',
                            flexShrink: 0,
                            paddingBottom: '4px'
                        }}>
                            <input type="checkbox" 
                            checked={task.checked || false}
                            onChange={() => toggleTask(index)}
                            style={{ 
                                width: '32px',
                                height: '32px', 
                                cursor: 'pointer', 
                                margin: 0,
                                flexShrink: 0,
                            }} />
                            <span style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minWidth: 0,
                                flex: 1,
                                color: 'var(--text-h)',
                                lineHeight: '1.4',
                                textDecoration: task.checked ? 'line-through' : 'none',
                            }}>
                                {task.name}
                            </span>
                        </label>
                        <div style={{
                            marginLeft: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <div style={{
                                background: '#333',
                                border: '1px solid var(--accent)',
                                borderRadius: '8px',
                                padding: '4px 12px',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <XPPerTask taskCategory={task.type} />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <button
                                    onClick={() => {
                                        if (editingIndex === index) {
                                            setEditingIndex(null)
                                        } else {
                                            setEditingIndex(index)
                                            setTaskName(task.name)
                                            setSelectedCategory(task.type)
                                        }
                                    }}
                                    style={{
                                        background: getCategoryColorBg(task.type),
                                        border: `2px solid ${getCategoryColorBorder(task.type)}`,
                                        borderRadius: '8px',
                                        padding: '4px 12px',
                                        minWidth: '120px',
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                        color: 'white',
                                        marginRight: '16px'
                                    }}>
                                    <TaskType taskCategory={task.type} />
                                </button>
                                {editingIndex === index && (
                                    <div className="modifyTaskMenu">
                                        <div style={{
                                            fontSize: '26px',
                                            color: 'var(--text-h)',
                                            padding: '4px 8px'
                                        }}>
                                            <u>Task:</u>
                                            <input 
                                                type="text"
                                                placeholder="New Task"
                                                value={taskName}
                                                onChange={(e) => setTaskName(e.target.value)}
                                                style={{
                                                    fontSize: '20px',
                                                    color: 'var(--text-h)',
                                                    padding: '2px 8px',
                                                    marginLeft: '8px',
                                                    background: '#333',
                                                    border: '1px solid #555',
                                                    borderRadius: '4px',
                                                    width: '80%'
                                                }}
                                            />
                                        </div>
                                        {error && (
                                            <div style={{ color: 'red', fontSize: '16px', padding: '0 8px' }}>
                                                {error}
                                            </div>
                                        )}
                                        <div style={{
                                            fontSize: '26px',
                                            color: 'var(--text-h)',
                                            padding: '4px 8px',
                                        }}>
                                            <u>Pick Category:</u>
                                            <div style={{ position: 'relative', display: 'inline-block', marginLeft: '8px' }}>
                                                <button
                                                    onClick={() => setCategoryOpen(!categoryOpen)}
                                                    style={{
                                                        background: getCategoryColorBg(selectedCategory),
                                                        border: `2px solid ${getCategoryColorBorder(selectedCategory)}`,
                                                        borderRadius: '8px',
                                                        padding: '4px 12px',
                                                        width: '230px',
                                                        fontSize: '20px',
                                                        cursor: 'pointer',
                                                        color: 'white',
                                                        boxSizing: 'border-box'
                                                    }}
                                                >
                                                    {selectedCategory}
                                                </button>
                                                {categoryOpen && (
                                                    <div className="dropdownMenu" style={{ 
                                                        top: '100%', 
                                                        left: 0,
                                                        right: 0,
                                                        margin: '4px auto',
                                                        width: '100%',
                                                        boxSizing: 'border-box',
                                                        }}>
                                                        {categories.map((category, index) => (
                                                            <div
                                                                key={index}
                                                                className="dropdownMenuItem"
                                                                style={{
                                                                    background: getCategoryColorBg(category),
                                                                    border: `2px solid ${getCategoryColorBorder(category)}`,
                                                                    borderRadius: '8px',
                                                                    color: 'white',
                                                                    marginBottom: '4px',
                                                                    textAlign: 'center'
                                                                }}
                                                                onClick={(e) => { 
                                                                    e.stopPropagation(); 
                                                                    setSelectedCategory(category); 
                                                                    setCategoryOpen(false); 
                                                                }}>
                                                                {category}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <button onClick={() => handleSave(index)} style={{
                                                borderRadius: '8px',
                                                block: 'inline',
                                                border: '2px solid var(--accent)',
                                                padding: '0 12px',
                                                width: '190px',
                                                fontSize: '20px',
                                                cursor: 'pointer',
                                                color: 'white',
                                                boxSizing: 'border-box',
                                                background: 'var(--accent)',
                                                marginTop: '18px'
                                            }}>
                                                Save
                                            </button>
                                            <button onClick={handleCancel} style={{
                                                borderRadius: '8px',
                                                block: 'inline',
                                                border: '2px solid #555',
                                                padding: '0 12px',
                                                width: '190px',
                                                fontSize: '20px',
                                                cursor: 'pointer',
                                                color: 'white',
                                                boxSizing: 'border-box',
                                                background: '#555',
                                                marginTop: '18px',
                                                marginLeft: '22px'
                                            }}>
                                                Cancel
                                            </button>
                                        </div>
                                        <button onClick={() => handleDelete(index)} style={{
                                            borderRadius: '8px',
                                            border: '2px solid #9e0000',
                                            padding: '0',
                                            width: '95%',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                            color: 'white',
                                            boxSizing: 'border-box',
                                            background: '#ff0000',
                                            marginTop: '8px',
                                            marginLeft: '8px',
                                            marginBottom: '4px'
                                        }}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    )
                })}
                <DrawAddTaskButton onAddTask={addTaskToList}/>
            </div>
        </div>
    )
}