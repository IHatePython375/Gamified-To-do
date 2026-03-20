/*Dropdown implementation adapted from here: https://www.codemzy.com/blog/reactjs-dropdown-component*/
import React from 'react'
import './dropdown.css'

export const DropdownContext = React.createContext();

function Dropdown({ children, direction = "down" }) {
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        function close(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div ref={dropdownRef} className={`dropdown ${direction}`}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

export default Dropdown