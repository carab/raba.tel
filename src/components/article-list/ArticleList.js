import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Container from '../container/Container'
import ArticleSummary from '../article/ArticleSummary'

import './ArticleList.css'

export default class ArticleList extends Component {
  render() {
    return (
      <Container>
        <div className="ArticleList">
          <ArticleListQuery>
            {items =>
              items.map(item => <ArticleSummary key={item.id} {...item} />)
            }
          </ArticleListQuery>
        </div>
      </Container>
    )
  }
}

export function ArticleListQuery({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: {
              frontmatter: { draft: { ne: true } }
              fields: { section: { eq: "article" }, index: { eq: false } }
            }
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
            edges {
              node {
                id
                excerpt(pruneLength: 200)
                fields {
                  slug
                  section
                }
                frontmatter {
                  title
                  date
                  banner {
                    childImageSharp {
                      sizes(maxWidth: 600) {
                        src
                        srcSet
                        aspectRatio
                        sizes
                      }
                    }
                  }
                  description
                  weight
                }
              }
            }
          }
        }
      `}
      render={data =>
        children(
          data.allMarkdownRemark.edges.map(edge => ({
            id: edge.node.id,
            excerpt: edge.node.excerpt,
            ...edge.node.fields,
            ...edge.node.frontmatter,
          }))
        )
      }
    />
  )
}

ArticleListQuery.propTypes = {
  children: PropTypes.func.isRequired,
}
