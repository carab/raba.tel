import React from 'react'
import PropTypes from 'prop-types'

import './Main.css'

export default function Main({ children }) {
  return <main className="Main">{children}</main>
}

Main.propTypes = {
  children: PropTypes.node,
}
