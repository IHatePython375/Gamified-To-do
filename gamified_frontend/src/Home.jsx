import React from 'react';
import './Home.css';
import DrawTopbar from './components/topbar.jsx';
import ProgressBar from './components/progress_bar.jsx';
import GetDate from './track_tasks.jsx'
import DrawTodayWidget from './components/todayListHomePg.jsx';
import { XPPerTask } from './components/xpPerTask.jsx';

export default function Home() {
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
                    <ProgressBar progress={50} 
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
                    <ProgressBar progress={50} 
                        style={{
                            flex: 1,
                            height: '30px',
                            borderRadius: '8px',
                        }}/>
                </div>
                <div style={{width: '100%'}}>
                    <DrawTodayWidget tasks={[
                        {name: 'Testing long string task to ensure ellipses are formed', type: 'Homework'},
                        {name: 'Task 2', type: 'Chores'},
                        {name: 'Task 3', type: 'Work'}
                    ]}/>
                </div>
            </main>
        </div>
    );
}