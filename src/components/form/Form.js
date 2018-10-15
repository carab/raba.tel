import React, { Component } from 'react'

import './Form.css'

export default class Form extends Component {
  render() {
    const { children, ...props } = this.props

    return (
      <form className="Form" {...props}>
        {children}
      </form>
    )
  }
}
