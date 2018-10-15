import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Photo from '../photo/Photo'

import './GallerySummary.css'

export default class GallerySummary extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    banner: PropTypes.object,
    date: PropTypes.string,
    description: PropTypes.string,
  }

  render() {
    const { slug, title, banner } = this.props

    return (
      <Link to={slug} className="GallerySummary">
        {banner ? (
          <div className="GallerySummary_image">
            <Photo {...banner.childImageSharp} alt={title} />
          </div>
        ) : null}

        <h2 className="GallerySummary_title">{title}</h2>
      </Link>
    )
  }
}
