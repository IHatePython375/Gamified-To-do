// Implementation of progress bar adapted from here: https://www.geeksforgeeks.org/reactjs/how-to-create-a-custom-progress-bar-component-in-react-js/

import React from 'react'
import './progress_bar.css'

const ProgressBar = ({ progress, style }) => {
    let textPosition;
    if (progress == 0) {
        textPosition = {left: '4px'}
    }
    else if (progress == 100) {
        textPosition = {right: '4px'}
    }
    else {
        textPosition = {left: `calc(${progress}% - 20px)`}
    }

    return (
        <div
            className = "barContainer" 
            style={{ ...style, position: 'relative' }}>
            <div
                className = "progressBar"
                style = {{ 
                    width: progress + '%',
                    borderRadius: 'inherit' 
                }}
            >
                <span className="progressText" style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    ...textPosition
                }}>
                    {progress}%
                </span>
            </div>
        </div>
    )
}

export default ProgressBar