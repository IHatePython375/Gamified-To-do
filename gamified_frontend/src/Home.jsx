import React from 'react';
import './Home.css';
import DrawTopbar from './components/topbar.jsx';
import ProgressBar from './components/progress_bar.jsx';
import GetDate from './track_tasks.jsx'
import DrawTodayWidget from './components/todayListHomePg.jsx';
import { XPPerTask } from './components/xpPerTask.jsx';
import { useTasks } from './TaskContext.jsx'


export default function Home() {
    const { tasks } = useTasks()
    const todayStr = new Date().toLocaleDateString('en-US')
    const todayTasks = tasks.filter(t => t.date === todayStr)

    const todayProgress = todayTasks.length === 0 ? 0 : Math.round((todayTasks.filter(t => t.checked).length / todayTasks.length) * 100)
    const weekStart = (() => { const d = new Date(); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d })()
    const weekTasks = tasks.filter(t => { const td = new Date(t.date); const we = new Date(weekStart); we.setDate(weekStart.getDate() + 6); return td >= weekStart && td <= we })
    const weekProgress = weekTasks.length === 0 ? 0 : Math.round((weekTasks.filter(t => t.checked).length / weekTasks.length) * 100)


    return (
        <div className="app">
            <DrawTopbar page="Home"/>
            <main id="center">
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '50px',
                    boxSizing: 'border-box',
                    fontSize: '32px',
                    color: 'var(--text-h)',
                    padding: '8px 0',
                    marginTop: '8px'
                }}>
                    <u>Current Progress</u>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '16px',
                    width: '100%',
                    marginTop: '12px'
                }}>
                    <span style={{
                        fontSize: '32px',
                        color: 'var(--text-h)',
                        whiteSpace: 'nowrap',
                        width: '100px'
                    }}>
                        Today
                    </span>
                    <ProgressBar progress={todayProgress} 
                        style={{
                            flex: 1,
                            height: '30px',
                            borderRadius: '8px',
                        }}/>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '16px',
                    width: '100%',
                    marginTop: '32px'
                }}>
                    <span style={{
                        fontSize: '32px',
                        color: 'var(--text-h)',
                        whiteSpace: 'nowrap',
                        width: '100px'
                    }}>
                        Week
                    </span>
                    <ProgressBar progress={weekProgress} 
                        style={{
                            flex: 1,
                            height: '30px',
                            borderRadius: '8px',
                        }}/>
                </div>
                <div style={{width: '100%'}}>
                    <DrawTodayWidget tasks={todayTasks} />
                </div>
            </main>
        </div>
    );
}