// https://altcademy.com/blog/how-to-get-current-date-as-a-state-in-reactjs/

import React, {useState, useEffect} from 'react';

// Gets the current date (used for Today and as a reference point for the week and month views)
function GetDate({ options = { weekday: 'long', month: 'long', day: 'numeric' }}) {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <span>{date.toLocaleDateString('en-US', options)}</span>
    );
}

export default GetDate;