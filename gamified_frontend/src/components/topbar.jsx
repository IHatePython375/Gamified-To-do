import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Dropdown, { DropdownContext } from './dropdown.jsx'
import './levelProgression.css'
import Profile from '../assets/Profile.png'
import Profile2 from '../assets/Profile2.png'
import ProgressBar from './progress_bar.jsx';

function DropdownButton() {
    const { open, setOpen } = useContext(DropdownContext);

    return (
        <button
            className="dropdownButton"
            onClick={() => setOpen(!open)}
            data-open={open}
        >
            Home <span className="dropdownArrow"></span>
        </button>
    );
}

function DropdownMenu() {
    const { open, setOpen } = useContext(DropdownContext)

    if (!open) {
        return null;
    }

    const itemStyle = {
        borderBottom: '1px solid #555',
        paddingBottom: '6px'
    }

    return (
        <div className="dropdownMenu">
            <Link 
                to="/" 
                className="dropdownMenuItem"
                onClick={() => setOpen(false)}
                style={{ ...itemStyle, textDecoration: 'none', color: 'inherit' }}
            >
                Home
            </Link>
            <div className="dropdownMenuItem" style={itemStyle}>Item 2</div>
            <div className="dropdownMenuItem">Item 3</div>
        </div>
    );
}


export default function DrawTopbar() {
    return (
        <div style={{ width: '100%', position: 'relative', zIndex: 50 }}>
            <div style={{
                position: 'relative',
                width: '100%',
                height: '72px',
                boxSizing: 'border-box',
                padding: '0 16px'
            }}>
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 'calc(50% + 4px)',
                    transform: 'translateY(-50%)',
                }}>
                    <Dropdown direction="right">
                        <DropdownButton />
                        <DropdownMenu />
                    </Dropdown>
                </div>
                <div style={{
                    position: 'absolute',
                    right: '230px',
                    transform: 'translateY(-50%)',
                    top: 'calc(50% + 8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                }}>
                    <span style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '120px',
                        fontSize: '24px',
                        color: 'var(--text-h)'
                    }}>
                        Bronze II
                    </span>
                    <div className="badgeHover">
                        <img src={Profile2} alt="Profile2" style={{ width: '60px', height: '60px' }}/>
                        <div className="badgeHoverMenu">
                            <span style={{
                                paddingTop: '8px',
                                fontSize: '24px',
                                textAlign: 'center',
                                color: 'var(--text-h)'
                            }}>
                                Next Level:
                            </span>
                            <span style={{
                                paddingTop: '8px',
                                textAlign: 'center',
                            }}>
                                <img src={Profile2} alt="Profile2" style={{ width: '180px', height: '180px' }}/>
                            </span>
                            <span style={{
                                paddingTop: 0,
                                fontSize: '18px',
                                textAlign: 'center',
                                color: 'var(--text-h)'
                            }}>
                                Bronze III
                            </span>
                            <span style={{
                                paddingTop: '6px',
                                fontSize: '16px',
                                textAlign: 'center',
                                color: 'var(--text-h)'
                            }}>
                                Current progress to Bronze III:
                            </span>
                            <ProgressBar progress={50} />
                            <span style={{
                                paddingTop: 0,
                                fontSize: '14px',
                                textAlign: 'center',
                                color: 'var(--text-h)'
                            }}>
                                3500/7000 XP
                            </span>
                        </div>
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    right: '10px',
                    top: 'calc(50% + 8px)',
                    transform: 'translateY(-50%)',
                }}>
                    <Link to="/" className="profileLink" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                        <span style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '120px',
                            fontSize: '24px',
                            color: 'var(--text-h)'
                        }}>
                            TestName
                        </span>
                        <img src={Profile} alt="Profile" className="profileButtonImg" style={{ width: '60px', height: '60px', left: '6px' }}/>
                    </Link>
                </div>
            </div>
            <hr className="topbarDivider" style={{ marginTop: '12px' }}/>
        </div>
    );
}