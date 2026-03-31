import React from 'react'
import { XPPerTask, TaskType } from './xpPerTask'
import { useCategoryColors } from './categoryHelper.jsx'
import DrawAddTaskButton from './addTaskButton.jsx'
import { useTasks } from '../TaskContext.jsx'
import './modifyTaskButton.css'

const categories = ['Homework', 'Chores', 'Work']

/*Remove pre-loaded tasks after designing rest of interface, used just for */
export default function DrawTodayPgWidget({ date }) {
    const { tasks, addTask, toggleTask, updateTask, deleteTask } = useTasks()
    const filteredTasks = tasks.filter(t => t.date === date)

    const [editingId, setEditingId] = React.useState(null)
    const [taskName, setTaskName] = React.useState('')
    const [error, setError] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('General')
    const [categoryOpen, setCategoryOpen] = React.useState(false)
    const modifyTaskRef = React.useRef(null)
    const {getCategoryColorBg, getCategoryColorBorder} = useCategoryColors()

    React.useEffect(() => {
        function handleClickOutside(e) {
            if (modifyTaskRef.current && !modifyTaskRef.current.contains(e.target)) {
                seteditingId(null)
                setCategoryOpen(false)
            }
        }
        if (editingId != null) {
        const timer = setTimeout(() => {
            window.addEventListener('click', handleClickOutside)
        }, 0)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('click', handleClickOutside)
        }
    }
    return () => window.removeEventListener('click', handleClickOutside)
    }, [editingId])

    // React.useEffect(() => {
    //     if (onTasksChange) {
    //         onTasksChange(tasks)
    //     }
    // }, [tasks])

    function addTaskToList(newTask) {
        addTask({ ...newTask, date: date })
    }

    function handleSave(id) {
        const updatedName = taskName.trim() || filteredTasks.find(t => t.id === id).name
        updateTask(id, { name: updatedName, type: selectedCategory })
        setTaskName('')
        setSelectedCategory('General')
        setError('')
        setEditingId(null)
    }

    function handleCancel() {
        setTaskName('')
        setSelectedCategory('General')
        setError('')
        setCategoryOpen(false)
        setEditingId(null)
    }

    return (
        <div style={{ width: '100%', position: 'relative', zIndex: 40, overflow: 'visible' }}>
            <div style={{
                width: '100%',
                marginTop: '32px',
                marginBottom: '24px',
                minHeight: 'auto',
                background: 'var(--widgetBackground)',
                border: '2px solid #555',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxSizing: 'border-box',
                overflow: 'visible'
            }}>
                {filteredTasks.map((task) => (
                    <div key={task.id} style={{
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
                                onChange={() => toggleTask(task.id)}
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
                                background: 'var(--button-bg)',
                                border: '1px solid var(--accent)',
                                borderRadius: '8px',
                                padding: '4px 12px',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <XPPerTask taskCategory={task.type} />
                            </div>
                            <div style={{ position: 'relative' }} ref={modifyTaskRef}>
                                <button
                                    onClick={() => {
                                        if (editingId === task.id) {
                                            setEditingId(null)
                                        } else {
                                            setEditingId(task.id)
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
                                        color: 'var(--text-h)',
                                        marginRight: '16px'
                                    }}>
                                    <TaskType taskCategory={task.type} />
                                </button>
                                {editingId === task.id && (
                                    <div className="modifyTaskMenu">
                                        <div style={{
                                            fontSize: '26px',
                                            color: 'var(--text-h)',
                                            padding: '4px 8px',
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
                                                    background: 'var(--xpWidgetBg)',
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
                                                        {categories.map((category, i) => (
                                                            <div
                                                                key={i}
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
                                            <button onClick={() => handleSave(task.id)} style={{
                                                borderRadius: '8px',
                                                border: '2px solid var(--accent)',
                                                padding: '0 12px',
                                                width: '190px',
                                                fontSize: '20px',
                                                cursor: 'pointer',
                                                color: 'var(--text-h)',
                                                boxSizing: 'border-box',
                                                background: 'var(--accent)',
                                                marginTop: '18px'
                                            }}>
                                                Save
                                            </button>
                                            <button onClick={handleCancel} style={{
                                                borderRadius: '8px',
                                                border: '2px solid #555',
                                                padding: '0 12px',
                                                width: '190px',
                                                fontSize: '20px',
                                                cursor: 'pointer',
                                                color: 'var(--text-h)',
                                                boxSizing: 'border-box',
                                                background: '#555',
                                                marginTop: '18px',
                                                marginLeft: '22px'
                                            }}>
                                                Cancel
                                            </button>
                                        </div>
                                        <button onClick={() => deleteTask(task.id)} style={{
                                            borderRadius: '8px',
                                            border: '2px solid #9e0000',
                                            padding: '0',
                                            width: '95%',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                            color: 'var(--text-h)',
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
                ))}
                <DrawAddTaskButton onAddTask={addTaskToList}/>
            </div>
        </div>
    )
}