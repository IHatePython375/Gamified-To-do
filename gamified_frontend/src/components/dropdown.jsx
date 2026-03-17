/*Dropdown implementation adapted from here: https://www.codemzy.com/blog/reactjs-dropdown-component*/
import React from 'react'
import './dropdown.css'

const DropdownContext = React.createContext();

function Dropdown({ children, direction = "down" }) {
    const [open, setOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        function close(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        if (open) {
            window.addEventListener("click", close);
        }
        return () => {
            window.removeEventListener("click", close);
        };
    }, [open]);

    const enhancedChildren = React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
            return child;
        }

        if (child.props?.className === 'dropdownTrigger') {
            return React.cloneElement(child, {
                children: React.Children.map(child.props.children, (inner) => {
                    if (!React.isValidElement(inner)) {
                        return inner;
                    }

                    if (inner.type === 'button') {
                        return React.cloneElement(inner, {
                            onClick: () => setOpen(!open),
                            'data-open': open,
                        });
                    }

                if (inner.props?.className === 'dropdownMenu') {
                    if (open) {
                        return inner;
                    }
                    else {
                        return null;
                    }
                }

                return inner;
                }),
            });
        }

        return child;
    });

    return (
        <DropdownContext.Provider value={{ open, setOpen }}>
            <div ref={dropdownRef} className={`dropdown ${direction}`}>
                {enhancedChildren}
            </div>
        </DropdownContext.Provider>
    );
};

export default Dropdown