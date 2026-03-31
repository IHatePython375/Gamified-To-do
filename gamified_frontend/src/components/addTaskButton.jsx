/*Dropdown implementation adapted from here: https://www.codemzy.com/blog/reactjs-dropdown-component*/
import React, {useContext} from 'react'
import './addTaskButton.css'
import { TaskType } from './xpPerTask'
import { useCategoryColors } from './categoryHelper.jsx'
import Dropdown, {DropdownContext} from './dropdown.jsx'

const AddTaskContext = React.createContext();

const categories = ['Homework', 'Chores', 'Work']

function AddTask({ children, direction = "down", onAddTask }) {
    const [open, setOpen] = React.useState(false);
    const addTaskRef = React.useRef(null);

    React.useEffect(() => {
        function close(e) {
            if (addTaskRef.current && !addTaskRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        if (open) {
            window.addEventListener("click", close);
        }
        return () => {
            window.removeEventListener("click", close);
        };
    }, [open]);

    return (
        <AddTaskContext.Provider value={{ open, setOpen, onAddTask }}>
            <div ref={addTaskRef} className={`addTask ${direction}`}>
                {children}
            </div>
        </AddTaskContext.Provider>
    )
}

function AddTaskButton({ open, setOpen }) {
    return (
        <button
            className="addTaskButton"
            onClick={() => setOpen(!open)}
            data-open={open}
            style={{
                marginBottom: '8px'
            }}>
            + Add Task <span className="addTaskArrow"></span>
        </button>
    );
}

function AddTaskMenu({ open, setOpen, onAddTask }) {
    const [selectedCategory, setSelectedCategory] = React.useState('General')
    const [categoryOpen, setCategoryOpen] = React.useState(false)
    const [taskName, setTaskName] = React.useState('')
    const [error, setError] = React.useState('')
    const {getCategoryColorBg, getCategoryColorBorder} = useCategoryColors()

    if (!open) {
        return null;
    }

    function handleSave() {
        if (!taskName.trim()) {
            setError('Please enter a task name.');
            return;
        }
        onAddTask({ name: taskName.trim(), type: selectedCategory });
        setTaskName('');
        setSelectedCategory('General');
        setError('');
        setOpen(false);
    }

    function handleCancel() {
        setTaskName('');
        setSelectedCategory('General');
        setError('');
        setOpen(false);
    }

    return (
        <div className="addTaskMenu">
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
                <button onClick={handleSave} style={{
                    borderRadius: '8px',
                    block: 'inline',
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
                    block: 'inline',
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
        </div>
    )
}

export default function DrawAddTaskButton({onAddTask}) {
    const [open, setOpen] = React.useState(false)
    const addTaskRef = React.useRef(null)

    React.useEffect(() => {
        function close(e) {
            if (addTaskRef.current && !addTaskRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        if (open) window.addEventListener("click", close);
        return () => window.removeEventListener("click", close);
    }, [open])

    return (
        <div ref={addTaskRef} className="addTask right">
            <AddTaskButton open={open} setOpen={setOpen} />
            <AddTaskMenu open={open} setOpen={setOpen} onAddTask={onAddTask} />
        </div>
    );
}