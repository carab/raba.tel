import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withTranslations from '../../hoc/withTranslations'
import Photo from '../photo/Photo'
import { dateFormat } from '../utils/DateFormat'

import './Article.css'

export default withTranslations({
  date: 'article.date',
})(
  class Article extends Component {
    static propTypes = {
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      banner: PropTypes.object,
      translations: PropTypes.object.isRequired,
      locale: PropTypes.string.isRequired,
      children: PropTypes.node,
    }

    render() {
      const { title, banner, date, children, locale, translations } = this.props

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
              {translations.date({
                date: dateFormat({ date, preset: 'PPP', locale }),
              })}
            </time>
          </div>
          <article className="Article_content" itemProp="articleBody">
            {children}
          </article>
        </section>
      )
    }
  }
)
