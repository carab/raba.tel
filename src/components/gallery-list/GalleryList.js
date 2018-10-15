import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import GallerySummary from '../gallery/GallerySummary'

import './GalleryList.css'

export default class GalleryList extends Component {
  render() {
    return (
      <div className="GalleryList">
        <GalleryListQuery>
          {items =>
            items.map(item => <GallerySummary key={item.id} {...item} />)
          }
        </GalleryListQuery>
      </div>
    )
  }
}

export function GalleryListQuery({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            filter: {
              frontmatter: { draft: { ne: true } }
              fields: { section: { eq: "gallery" }, index: { eq: false } }
            }
            sort: { fields: [frontmatter___weight], order: DESC }
          ) {
            edges {
              node {
                id
                fields {
                  slug
                  section
                }
                frontmatter {
                  title
                  date
                  banner {
                    childImageSharp {
                      sizes(maxWidth: 500) {
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
            ...edge.node.fields,
            ...edge.node.frontmatter,
          }))
        )
      }
    />
  )
}

GalleryListQuery.propTypes = {
  children: PropTypes.func.isRequired,
}
