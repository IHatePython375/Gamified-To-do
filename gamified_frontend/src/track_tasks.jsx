// https://altcademy.com/blog/how-to-get-current-date-as-a-state-in-reactjs/

import React, {useState, useEffect} from 'react';

function GetDate() {
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
        <div>
            <h1>Current Date: {date.toDateString()}</h1>
        </div>
    );
}

export default GetDate;