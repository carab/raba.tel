import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GalleryList, { ArticleListQuery } from '../gallery-list/GalleryList'
import ArticleList, { GalleryListQuery } from '../article-list/ArticleList'

export const RENDER_COMPONENTS = { ArticleList, GalleryList }
export const QUERY_COMPONENTS = { ArticleListQuery, GalleryListQuery }

export default class PageList extends Component {
  static propTypes = {
    render: PropTypes.oneOf(Object.keys(RENDER_COMPONENTS)).isRequired,
    query: PropTypes.oneOf(Object.keys(QUERY_COMPONENTS)).isRequired,
  }

  render() {
    const { render, query, ...props } = this.props
    const renderer = {
      component: RENDER_COMPONENTS[render],
    }
    const querier = {
      component: QUERY_COMPONENTS[query],
    }

    return (
      <querier.component>
        {data => <renderer.component items={data.edges} {...props} />}
      </querier.component>
    )
  }
}
