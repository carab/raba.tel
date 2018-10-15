import React from 'react'
import PropTypes from 'prop-types'

import './Button.css'

export default function Button({
  type,
  children,
  primary,
  className,
  ...props
}) {
  const primaryClass = primary ? 'Button-primary' : ''

  return (
    <button type={type} className={`Button ${primaryClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  className: PropTypes.string,
}
