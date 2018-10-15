import React from 'react'
import PropTypes from 'prop-types'

import './PageTitle.css'

export default function PageTitle({ children }) {
  return (
    <div className="PageTitle">
      <h1>{children}</h1>
    </div>
  )
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
}
