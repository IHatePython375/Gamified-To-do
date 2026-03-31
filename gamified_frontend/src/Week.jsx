import React from 'react';
import './Week.css';
import DrawTopbar from './components/topbar.jsx';
import ProgressBar from './components/progress_bar.jsx';
import GetDate from './track_tasks.jsx'
import DrawTodayPgWidget from './components/taskWidget.jsx';
import { XPPerTask } from './components/xpPerTask.jsx';
import DrawAddTaskButton from './components/addTaskButton.jsx';
import { useTasks } from './TaskContext.jsx'


export default function Week() {
    const currDay = new Date()
    const dayOfWeek = currDay.getDay()
    const startOfWeek = new Date(currDay)
    startOfWeek.setDate(currDay.getDate() - (dayOfWeek + 6) % 7)

    function getDay(offset) {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + offset)
        return date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
    }

    function getDayISO(offset) {
        const d = new Date(startOfWeek)
        d.setDate(startOfWeek.getDate() + offset)
        return d.toLocaleDateString('en-CA') 
    }

    const { tasks } = useTasks()
    const weekTasks = tasks.filter(t => {
        const taskDate = new Date(t.date)
        const weekEnd = new Date(startOfWeek)
        weekEnd.setDate(startOfWeek.getDate() + 6)
        return taskDate >= startOfWeek && taskDate <= weekEnd
    })
    const weekCompleted = weekTasks.filter(t => t.checked).length
    const weekProgress = weekTasks.length === 0 ? 0 : Math.round((weekCompleted / weekTasks.length) * 100)



    return (
        <div className="app">
            <DrawTopbar page="Week"/>
            <main id="center">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '16px',
                    width: '100%',
                    marginTop: '12px'
                }}>
                    <ProgressBar progress={weekProgress} 
                        style={{
                            flex: 1,
                            height: '30px',
                            borderRadius: '8px',
                        }}/>
                </div>
                <span style={{
                    fontSize: '24px',
                    color: 'var(--text-h)',
                    width: '100%',
                    marginTop: '12px',
                    display: 'block',
                    textAlign: 'center',
                }}>
                    {weekCompleted}/{weekTasks.length} tasks complete for the week
                </span>
                <div>

                    <div style={{
                        color: (() => {
                            if (0 == (dayOfWeek + 6) % 7) {
                                return 'var(--accent)'
                            }
                            else {
                                return 'var(--text-h)'
                            }
                        })(),
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        {(() => {
                            if (0 == (dayOfWeek + 6) % 7) {
                                return <u>Today - Monday, {getDay(0)}</u>
                            }
                            else {
                                return <u>Monday - {getDay(0)}</u>
                            }
                        })()}
                    </div>
                    <DrawTodayPgWidget date={getDayISO(0)} />
                </div>
                <div>
                    <div style={{
                        color: (() => {
                            if (1 == (dayOfWeek + 6) % 7) {
                                return 'var(--accent)'
                            }
                            else {
                                return 'var(--text-h)'
                            }
                        })(),
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        {(() => {
                            if (1 == (dayOfWeek + 6) % 7) {
                                return <u>Today - Tuesday, {getDay(1)}</u>
                            }
                            else {
                                return <u>Tuesday - {getDay(1)}</u>
                            }
                        })()}
                    </div>
                    <DrawTodayPgWidget date={getDayISO(1)} />
                </div>
                <div>
                    <div style={{
                        color: (() => {
                            if (2 == (dayOfWeek + 6) % 7) {
                                return 'var(--accent)'
                            }
                            else {
                                return 'var(--text-h)'
                            }
                        })(),
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        {(() => {
                            if (2 == (dayOfWeek + 6) % 7) {
                                return <u>Today - Wednesday, {getDay(2)}</u>
                            }
                            else {
                                return <u>Wednesday - {getDay(2)}</u>
                            }
                        })()}
                    </div>
                    <DrawTodayPgWidget date={getDayISO(2)} />

                </div>
                <div>
                    <div style={{
                        color: (() => {
                            if (3 == (dayOfWeek + 6) % 7) {
                                return 'var(--accent)'
                            }
                            else {
                                return 'var(--text-h)'
                            }
                        })(),
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Thursday - {getDay(3)}</u>
                    </div>
                    <DrawTodayPgWidget date={getDayISO(3)} />

                </div>
                <div>
                    <div style={{
                        color: (() => {
                            if (4 == (dayOfWeek + 6) % 7) {
                                return 'var(--accent)'
                            }
                            else {
                                return 'var(--text-h)'
                            }
                        })(),
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Friday - {getDay(4)}</u>
                    </div>
                    <DrawTodayPgWidget date={getDayISO(4)} />

                </div>
                <div>
                    <div style={{
                        color: (() => {
                            if (5 == (dayOfWeek + 6) % 7) {
                                return 'var(--accent)'
                            }
                            else {
                                return 'var(--text-h)'
                            }
                        })(),
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Saturday - {getDay(5)}</u>
                    </div>
                    <DrawTodayPgWidget date={getDayISO(5)} />

                </div>
                <div>
                    <div style={{
                        color: (() => {
                            if (6 == (dayOfWeek + 6) % 7) {
                                return 'var(--accent)'
                            }
                            else {
                                return 'var(--text-h)'
                            }
                        })(),
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Sunday - {getDay(6)}</u>
                    </div>
                    <DrawTodayPgWidget date={getDayISO(6)} />
                </div>
            </main>
        </div>
    );
}