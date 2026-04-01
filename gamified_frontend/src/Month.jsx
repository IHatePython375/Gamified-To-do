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

export default function Month() {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showDayWidget, setShowDayWidget] = useState(false)
    const [widgetDateKey, setWidgetDateKey] = useState(null)

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
        dateStr = selectedDate.toLocaleDateString('en-US')
    }
    else {
        dateStr = null
    }

    return (
        <div className="app">
            <DrawTopbar page="Month"/>
            <main id="center">
            <div>
                <Calendar
                    value={selectedDate}
                    onClickDay={dayClicked}
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