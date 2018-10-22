import React from 'react'
import PropTypes from 'prop-types'

import './Icon.css'

export default function Icon({ name, className, ...props }) {
  // eslint-disable-next-line
  const Icon = require(`../../images/icons/${name}.svg`)

  return (
    <i className={`Icon Icon-${name} ${className ? className : ''}`} {...props}>
      <Icon />
    </i>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}
