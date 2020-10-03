import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TogglableForm = props  => {

  TogglableForm.propTypes = {
    showButtonLabel: PropTypes.string.isRequired,
    hideButtonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }


  return(
    <div>
      <div style={hideWhenVisible}>
        <h3>{props.header}</h3>
        <button id='newblog' onClick={toggleVisible}>{props.showButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id='cancel' onClick={toggleVisible}>{props.hideButtonLabel}</button>
      </div>
    </div>
  )
}

export default TogglableForm