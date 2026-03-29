import React from 'react';
import './Today.css';
import DrawTopbar from './components/topbar.jsx';
import ProgressBar from './components/progress_bar.jsx';
import GetDate from './track_tasks.jsx'
import DrawTodayPgWidget from './components/taskWidget.jsx';
import { XPPerTask } from './components/xpPerTask.jsx';
import DrawAddTaskButton from './components/addTaskButton.jsx';
import { useTasks } from './TaskContext.jsx'


export default function Today() {
    const todayStr = new Date().toLocaleDateString('en-CA'); 

    const { tasks } = useTasks()
    const todayCompleted = tasks.filter(t => t.date === todayStr && t.checked).length
    const todayProgress = tasks.filter(t => t.date === todayStr).length === 0 ? 0 : Math.round((todayCompleted / tasks.filter(t => t.date === todayStr).length) * 100)


    return (
        <div className="app">
            <DrawTopbar page="Today"/>
            <main id="center">
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '16px',
                    width: '100%',
                    marginTop: '12px'
                }}>
                    <ProgressBar progress={todayProgress} 
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
                    {todayCompleted}/{tasks.filter(t => t.date === todayStr).length} tasks complete for the day
                </span>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u><GetDate options={{weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}}/></u>
                    </div>
                    <div style={{width: '100%'}}>
                        <DrawTodayPgWidget date={todayStr} />
                    </div>
                </div>
            </main>
        </div>
    );
}