import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import EventListener from 'react-event-listener'

import Icon from '../icon/Icon'

import './Header.css'

export default class Header extends Component {
  state = {
    toggled: false,
    sticked: false,
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    socials: PropTypes.object.isRequired,
    children: PropTypes.node,
  }

  render() {
    const {
      title,
      children,
      socials: { facebookUrl, twitterUrl, instagramUrl },
    } = this.props
    const { toggled, sticked } = this.state

    return (
      <header className={`Header ${sticked ? 'Header-sticked' : ''}`}>
        <EventListener
          target="document"
          onKeyup={this.handleKeyUp}
          onClick={this.handleClickOutside}
          onScroll={this.handleScroll}
        />
        <div className="Header_bar">
          <div className="Header_logo">
            <Link to="/">{title}</Link>
          </div>
          <div
            className="Header_nav"
            aria-hidden={!toggled}
            ref={ref => (this.navRef = ref)}
          >
            {children}
          </div>
          <div className="Header_socials">
            {facebookUrl ? (
              <a href={facebookUrl} title="Facebook">
                <Icon name="facebook" />
              </a>
            ) : null}
            {twitterUrl ? (
              <a href={twitterUrl} title="Twitter">
                <Icon name="twitter" />
              </a>
            ) : null}
            {instagramUrl ? (
              <a href={instagramUrl} title="Instagram">
                <Icon name="instagram" />
              </a>
            ) : null}
            <button
              type="button"
              className="Header_navToggle"
              onClick={this.handleClick}
              ref={ref => (this.buttonRef = ref)}
            >
              <Icon name="hamburger" />
            </button>
          </div>
        </div>
      </header>
    )
  }

  handleClick = () => {
    this.setState({
      toggled: !this.state.toggled,
    })
  }

  handleClickOutside = event => {
    if (
      this.navRef &&
      this.buttonRef &&
      !this.navRef.contains(event.target) &&
      !this.buttonRef.contains(event.target)
    ) {
      this.setState({
        toggled: false,
      })
    }
  }

  handleScroll = event => {
    const document = event.target

    const distance =
      document.scrollTop ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    this.setState({
      sticked: 0 < distance,
    })
  }

  handleKeyUp = event => {
    if (27 === event.keyCode) {
      this.setState({
        toggled: false,
      })
    }
  }
}
