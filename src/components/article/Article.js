import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Photo from '../photo/Photo'
import DateFormat from '../utils/DateFormat'

import './Article.css'

export default class Gallery extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    banner: PropTypes.object,
    children: PropTypes.node,
  }

  render() {
    const { title, banner, date, children } = this.props

    return (
      <section
        className="Article"
        itemScope
        itemType="http://schema.org/Article"
      >
        {banner ? (
          <div className="Article_banner">
            <Photo {...banner.childImageSharp} alt={title} />
          </div>
        ) : null}
        <div className="PageTitle">
          <h1 className="Article_title" itemProp="name">
            {title}
          </h1>
          <time className="Article_date" itemProp="date">
            Published on <DateFormat date={date} preset="PPP" />
          </time>
        </div>
        <article className="Article_content" itemProp="articleBody">
          {children}
        </article>
      </section>
    )
  }
}
