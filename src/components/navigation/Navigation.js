import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Icon from '../icon/Icon'

import './Navigation.css'

export default class Navigation extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark(
              filter: {
                frontmatter: {
                  navigation: { weight: { ne: null } }
                }
              }
              sort: { fields: [frontmatter___navigation___weight], order: DESC }
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    navigation {
                      name
                      parent
                      weight
                    }
                  }
                }
              }
            }
          }
        `}
        render={this.renderData}
      />
    )
  }

  normalize(data) {
    const allItems = data.allMarkdownRemark.edges.map(({ node }) => ({
      to: node.fields.slug,
      title: node.frontmatter.title,
      name: node.frontmatter.navigation.name,
      parent: node.frontmatter.navigation.parent,
      children: [],
    }))

    const children = allItems.filter(item => item.parent)
    const items = allItems.filter(item => !item.parent)

    children.forEach(child => {
      const item = allItems.find(item => item.name === child.parent)
      if (item) {
        item.children.push(child)
      }
    })

    return items
  }

  renderData = data => {
    const items = this.normalize(data)
    return (
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="Navigation"
      >
        <ul>
          {items.map((item, i) => (
            <Fragment key={item.to}>
              {i > 0 ? <li role="separator">•</li> : null}
              <Item {...item} />
            </Fragment>
          ))}
        </ul>
      </nav>
    )
  }
}

class Item extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
  }

  state = {
    toggled: false,
  }

  render() {
    const { to, title, children } = this.props
    const { toggled } = this.state

    return (
      <li
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Link to={to}>{title}</Link>
        {children.length ? (
          <button
            type="button"
            onClick={this.handleClick}
            aria-haspopup={children.length > 0}
            title="Open submenu"
          >
            <Icon name="plus" />
          </button>
        ) : null}
        {children.length > 0 ? (
          <ul aria-hidden={!toggled} aria-label="Submenu">
            {children.map(child => (
              <li key={child.to}>
                <Link to={child.to}>{child.title}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    )
  }

  handleMouseEnter = () => {
    this.setState({
      toggled: true,
    })
  }

  handleMouseLeave = () => {
    this.setState({
      toggled: false,
    })
  }

  handleClick = event => {
    event.preventDefault()

    const { toggled } = this.state

    this.setState({
      toggled: !toggled,
    })
  }
}
