import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { XPPerTask, TaskType } from './xpPerTask'
import { useCategoryColors } from './categoryHelper.jsx'
import { useTasks } from '../TaskContext.jsx'

export default function DrawTodayWidget({tasks=[]}) {
    const {getCategoryColorBg, getCategoryColorBorder} = useCategoryColors()
    const {toggleTask} = useTasks()

    let taskList
    if (tasks.length === 0) {
        taskList = (
            <div style={{
                color: 'var(--text-h)',
                fontSize: '20px',
                textAlign: 'center',
                margin: 'auto',
                padding: '16px'
            }}>
                No current tasks for today! To add a task for today, we recommend going to the Today page.
            </div>
        )
    } 
    else {
        taskList = tasks.map((task, index) => {
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
                    checked={task.is_completed || false}
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
                        lineHeight: '1.4'
                    }}>
                        {task.title}
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
                        <XPPerTask taskCategory={task.category} />
                    </div>
                    <div style={{
                        background: `${getCategoryColorBg(task.category)}`,
                        border: `2px solid ${getCategoryColorBorder(task.category)}`,
                        borderRadius: '8px',
                        padding: '4px 0',
                        display: 'flex',
                        minWidth: '120px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: 'var(--text-h)',
                        marginRight: '16px',
                    }}>
                        <TaskType taskCategory={task.category} />
                    </div>
                </div>
            </div>
            )
        })
    }
    
    return (
        <div style={{ width: '100%', position: 'relative', zIndex: 40 }}>
            <div style={{
                width: '100%',
                marginTop: '32px',
                marginBottom: '24px',
                height: 'calc(100vh - 312px)',
                background: 'var(--widgetBackground)',
                border: '2px solid #555',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    fontSize: '32px',
                    color: 'var(--text-h)',
                    whiteSpace: 'nowrap',
                    width: '100px',
                    padding: '8px 8px'
                }}>
                    <u>Today's Tasks</u>
                </div>
                {taskList}
                <Link to="/Today"
                    style={{
                        width: '40%',
                        height: '24px',
                        marginTop: 'auto',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: '8px',
                        background: '#3d3d3d',
                        border: '2px solid #555',
                        borderRadius: '12px',
                        padding: '8px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '24px',
                        boxSizing: 'border-box',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#212121',
                            flexShrink: 0
                        }}>
                        </div>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#212121',
                            flexShrink: 0,
                        }}>
                        </div>
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#212121',
                            flexShrink: 0,
                        }}>
                        </div>
                </Link>
            </div>
        </div>
    )
}