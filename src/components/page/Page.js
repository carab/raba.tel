import React from 'react'
import PropTypes from 'prop-types'

import './Page.css'

export default function Page({ children }) {
  return <div className="Page">{children}</div>
}

export function PageSeparator() {
  return <div className="Page_separator" />
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
}
