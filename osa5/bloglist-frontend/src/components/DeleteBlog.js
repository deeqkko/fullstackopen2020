import React, { useState, useImperativeHandle } from 'react'



const DeleteBlog = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisible = () => {
        if (visible === false) {
            setVisible(true)
        }
    }

    useImperativeHandle(ref, () =>{
        return{
            toggleVisible
        }
    })

    return(
        <div>
        <div style={hideWhenVisible}>
        </div>
        <div style={showWhenVisible}>
            <button onClick={props.handleDelete}>Delete</button>
        </div>
        </div>
    )
})

export default DeleteBlog