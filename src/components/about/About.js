import React from 'react'
import PropTypes from 'prop-types'

import './About.css'
import avatar from '../../images/avatar.jpg'

export default function About({ title, children }) {
  return (
    <div className="About">
      <div className="About_avatar">
        <img alt={title} src={avatar} />
      </div>
      {children}
    </div>
  )
}

About.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
