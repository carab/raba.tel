import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Pellicule from '../pellicule/Pellicule'
import Photo from '../photo/Photo'
import Container from '../container/Container'

import './Gallery.css'

export default class Gallery extends Component {
  static propTypes = {
    resources: PropTypes.array,
    children: PropTypes.node,
  }

  render() {
    const { resources, children } = this.props

    return (
      <div className="Gallery">
        <Container>
          <div className="Gallery_content">{children}</div>
        </Container>
        <Pellicule className="Pellicule Pellicule-padded">
          {resources && resources.map(resource => (
            <Photo
              key={resource.src.id}
              {...resource.src.childImageSharp}
              alt={resource.title}
            />
          ))}
        </Pellicule>
      </div>
    )
  }
}
