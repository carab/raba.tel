import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Container from '../container/Container'
import ArticleSummary from '../article/ArticleSummary'

import './ArticleList.css'

export default class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
  }

  render() {
    const { articles } = this.props

    return (
      <Container>
        <div className="ArticleList">
          {articles.map(article => (
            <ArticleSummary key={article.slug} {...article} />
          ))}
        </div>
      </Container>
    )
  }
}
