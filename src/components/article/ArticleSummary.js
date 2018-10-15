import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import Photo from '../photo/Photo'
import DateFormat from '../utils/DateFormat'

import './ArticleSummary.css'

export default class ArticleSummary extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    banner: PropTypes.object,
    date: PropTypes.string,
    description: PropTypes.string,
  }

  render() {
    const { slug, title, banner, date, description } = this.props

    return (
      <section
        className="ArticleSummary"
        itemScope
        itemType="http://schema.org/Article"
      >
        <h2 className="ArticleSummary_title" itemProp="name">
          <Link to={slug}>{title}</Link>
        </h2>
        <time className="ArticleSummary_date" itemProp="date">
          <DateFormat date={date} preset="PPP" />
        </time>
        {banner ? (
          <Link to={slug} className="ArticleSummary_banner">
            <Photo {...banner.childImageSharp} alt={title} />
          </Link>
        ) : null}
        {description ? (
          <article
            className="ArticleSummary_description"
            itemProp="articleBody"
          >
            {description + ' '}
            <Link className="ArticleSummary_more" to={slug}>
              Read more
            </Link>
          </article>
        ) : null}
      </section>
    )
  }
}
