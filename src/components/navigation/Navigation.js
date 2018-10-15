import React, { Component, Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'

import './Navigation.css'

export default class Navigation extends Component {
  render() {
    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="Navigation"
      >
        <ul>
          <StaticQuery
            query={graphql`
              query {
                allMarkdownRemark(
                  filter: {
                    frontmatter: {
                      draft: { ne: true }
                      menu: { main: { ne: null } }
                    }
                  }
                  sort: { fields: [frontmatter___menu___main], order: ASC }
                ) {
                  edges {
                    node {
                      id
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                      }
                    }
                  }
                }
              }
            `}
            render={data =>
              data.allMarkdownRemark.edges.map((edge, i) => (
                <Fragment key={edge.node.id}>
                  {i > 0 ? <li role="separator">•</li> : null}
                  <li>
                    <Link to={edge.node.fields.slug}>
                      {edge.node.frontmatter.title}
                    </Link>
                    {/* <a href="{{ $element.URL | relURL }}" aria-haspopup="true">
                      {{ $element.Name }}
                    </a>
                    <ul aria-hidden="true" aria-label="submenu">
                      {{ range $element.Children }}
                        <li>
                          <a href="{{ .URL | relURL }}">{{ .Name }}</a>
                        </li>
                      {{ end }}
                    </ul> */}
                  </li>
                </Fragment>
              ))
            }
          />
        </ul>
      </nav>
    )
  }
}
