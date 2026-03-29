import React from 'react';
import './Week.css';
import DrawTopbar from './components/topbar.jsx';
import ProgressBar from './components/progress_bar.jsx';
import GetDate from './track_tasks.jsx'
import DrawTodayPgWidget from './components/taskWidget.jsx';
import { XPPerTask } from './components/xpPerTask.jsx';
import DrawAddTaskButton from './components/addTaskButton.jsx';

export default function Week() {
    const currDay = new Date()
    const dayOfWeek = currDay.getDay()
    const startOfWeek = new Date(currDay)
    startOfWeek.setDate(currDay.getDate() - (dayOfWeek + 6) % 7)

    function getDay(offset) {
        const d = new Date(startOfWeek)
        d.setDate(startOfWeek.getDate() + offset)
        return d.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})
    }

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
                    <ProgressBar progress={50} 
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
                    10/20 tasks complete for the week
                </span>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Monday - {getDay(0)}</u>
                    </div>
                    <DrawTodayPgWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'},
                    ]}/>
                </div>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Tuesday - {getDay(1)}</u>
                    </div>
                    <DrawTodayPgWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'},
                    ]}/>
                </div>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Wednesday - {getDay(2)}</u>
                    </div>
                    <DrawTodayPgWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'},
                    ]}/>
                </div>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Thursday - {getDay(3)}</u>
                    </div>
                    <DrawTodayPgWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'},
                    ]}/>
                </div>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Friday - {getDay(4)}</u>
                    </div>
                    <DrawTodayPgWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'},
                    ]}/>
                </div>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Saturday - {getDay(5)}</u>
                    </div>
                    <DrawTodayPgWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'},
                    ]}/>
                </div>
                <div>
                    <div style={{
                        color: 'var(--text-h)',
                        fontSize: '36px',
                        marginTop: '60px',
                        marginBottom: '-12px',
                        textAlign: 'center'
                    }}>
                        <u>Sunday - {getDay(6)}</u>
                    </div>
                    <DrawTodayPgWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'},
                    ]}/>
                </div>
            </main>
        </div>
    );
}