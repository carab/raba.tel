import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Pellicule.css'

export default class Pellicule extends Component {
  render() {
    const {children} = this.props
    return <div className="Pellicule">{children}</div>
  }
}

Pellicule.propTypes = {
  children: PropTypes.node.isRequired,
}
