import React from 'react'
import Dropdown from './components/dropdown.jsx'

export default function DrawTopbar() {
    return (
        <div>

        <Dropdown direction="right">
        <div className="dropdownTrigger">
            <button className="dropdownButton">
            TestDropdown <span className="dropdownArrow"></span>
            </button>

            <div className="dropdownMenu">
            <div>Item 1</div>
            <div>Item 2</div>
            </div>
        </div>
        </Dropdown>

            <hr
                style={{
                    background: "rgb(0, 0, 0)",
                    color: "rgb(0, 0, 0)",
                    borderColor: "rgb(0, 0, 0)",
                    height: '3px'
                }}
            />
        </div>
    )
}