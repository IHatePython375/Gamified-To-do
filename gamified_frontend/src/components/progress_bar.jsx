// Implementation of progress bar adapted from here: https://www.geeksforgeeks.org/reactjs/how-to-create-a-custom-progress-bar-component-in-react-js/

import React from 'react'
import './progress_bar.css'

const ProgressBar = ({ progress }) => {
    return (
        <div className = "barContainer">
            <div
                className = "progressBar"
                style = {{ width: progress + '%' }}
            >
                <span className = "progressText">{progress}%</span>
            </div>
        </div>
    )
}

export default ProgressBar