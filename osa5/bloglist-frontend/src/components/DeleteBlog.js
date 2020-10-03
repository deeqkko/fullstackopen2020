import React, { useState, useImperativeHandle } from 'react'



const DeleteBlog = React.forwardRef((props, ref) => {

  DeleteBlog.displayName = 'DeleteBlog'

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = (visibility) => {
      setVisible(visibility)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleVisible
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
      </div>
      <div style={showWhenVisible}>
        <button id='delete' onClick={props.handleDelete}>Delete</button>
      </div>
    </div>
  )
})

export default DeleteBlog