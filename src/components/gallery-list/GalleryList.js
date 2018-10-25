import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GallerySummary from '../gallery/GallerySummary'

import './GalleryList.css'

export default class GalleryList extends Component {
  static propTypes = {
    galleries: PropTypes.array.isRequired,
  }

  render() {
    const { galleries } = this.props

    return (
      <div className="GalleryList">
        {galleries.map(gallery => (
          <GallerySummary key={gallery.slug} {...gallery} />
        ))}
      </div>
    )
  }
}
