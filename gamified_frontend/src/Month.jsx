/*Calendar implementation found here: https://www.geeksforgeeks.org/reactjs/how-to-create-calendar-in-reactjs/#approach-1-using-natscalereactcalendar*/

import React, {useState} from 'react';
import './Month.css';
import DrawTopbar from './components/topbar.jsx';
import ProgressBar from './components/progress_bar.jsx';
import GetDate from './track_tasks.jsx'
import DrawTodayPgWidget from './components/taskWidget.jsx';
import { XPPerTask } from './components/xpPerTask.jsx';
import DrawAddTaskButton from './components/addTaskButton.jsx';
import Calendar from 'react-calendar'
import { useTasks } from './TaskContext.jsx'

export default function Month() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showDayWidget, setShowDayWidget] = useState(false)
    const [widgetDateKey, setWidgetDateKey] = useState(null)
    const { tasks } = useTasks()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const overdueTasks = tasks.filter(t => {
        const d = new Date(t.scheduled_date + 'T00:00:00')
        return d < today && !t.is_completed
    })

    const tileContent = ({ date, view }) => {
        if (view !== 'month') return null
        const dateStr = date.toISOString().split('T')[0]
        const dayTasks = tasks.filter(t => t.scheduled_date === dateStr)
        if (dayTasks.length === 0) return null
        const completed = dayTasks.filter(t => t.is_completed).length
        const isOverdue = date < today && completed < dayTasks.length
        return (
            <div style={{ fontSize: '10px', marginTop: '2px', color: isOverdue ? '#ff6b6b' : '#4caf50', fontWeight: 'bold' }}>
                {completed}/{dayTasks.length}
            </div>
        )
    }

    const dayClicked = (date) => {
        setSelectedDate(date)
        setWidgetDateKey(date.toDateString())
        setShowDayWidget(true)
    }

    const closeWidget = () => {
        setShowDayWidget(false)
        setSelectedDate(null)
    }

    let dateStr
    if (selectedDate) {
        dateStr = selectedDate.toISOString().split('T')[0]
    }
    else {
        dateStr = null
    }

    return (
        <div className="app">
            <DrawTopbar page="Month"/>
            <main id="center">
            <div>
                {overdueTasks.length > 0 && (
                    <div style={{
                        backgroundColor: '#ff6b6b22',
                        border: '1px solid #ff6b6b',
                        borderRadius: '8px',
                        padding: '8px 14px',
                        marginBottom: '12px',
                        color: '#ff6b6b',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        ⚠ {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''} — check past days
                    </div>
                )}
                <Calendar
                    value={selectedDate}
                    onClickDay={dayClicked}
                    tileContent={tileContent}
                />
            </div>
            </main>
            <div
                onClick={closeWidget}
                style={{
                    display: (() => {
                        if (showDayWidget == true) {
                            return 'block'
                        }
                        else {
                            return 'none'
                        }
                    })(),
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 60
                }}
            />
            <div style={{
                position: 'fixed',
                display: (() => {
                    if (showDayWidget == true) {
                        return 'flex'
                    }
                    else {
                        return 'none'
                    }
                })(),
                flexDirection: 'column',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 101,
                width: '90%',
                maxWidth: '960px',
                minHeight: '400px',
                maxHeight: '80vh',
                overflowY: 'auto',
                background: 'var(--bg)',
                borderRadius: '12px',
                border: '2px solid (--border)',
                padding: '16px',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                }}>
                    <span style={{
                        color: 'var(--text-h)',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>
                        {widgetDateKey}
                    </span>
                    <button 
                        onClick={closeWidget}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--text-h)',
                            borderRadius: '6px',
                            color: 'var(--text-h)',
                            fontSize: '20px',
                            cursor: 'pointer',
                            lineHeight: 1,
                            padding: '2px 10px'
                    }}>
                        Close
                    </button>
                </div>
                <div style={{
                    marginTop: 'auto'
                }}>
                    <DrawTodayPgWidget
                        date={dateStr}
                        key={dateStr}                    />
                </div>
            </div>
        </div>
    );
}