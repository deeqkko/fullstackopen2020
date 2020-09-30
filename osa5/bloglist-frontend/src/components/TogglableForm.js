import React, { useState } from 'react'

const TogglableForm = props  => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisible = () => {
        setVisible(!visible)
    }


    return(
        <div>
            <div style={hideWhenVisible}>
                <h3>{props.header}</h3>
                <button onClick={toggleVisible}>{props.showButtonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisible}>{props.hideButtonLabel}</button>
            </div>
        </div>
    )
}

export default TogglableForm