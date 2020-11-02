import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import EventListener from 'react-event-listener'
import { window } from 'browser-monads'

import Icon from '../icon/Icon'

import './Header.css'
import { useIntl } from 'react-intl'

function Header(props) {
  const intl = useIntl()

  const {
    title,
    children,
    socials: { facebookUrl, twitterUrl, instagramUrl },
  } = props

  const [toggled, setToggled] = useState(false)
  const [sticked, setSticked] = useState(false)
  const [copied, setCopied] = useState(false)

  // Automatically hidden the copied message after 3 seconds
  useEffect(
    () => {
      if (copied) {
        const timeout = window.setTimeout(() => {
          setCopied(false)
        }, 3000)

        return () => {
          window.clearTimeout(timeout)
        }
      }
    },
    [copied]
  )

  const navRef = useRef()
  const buttonRef = useRef()
  const canShare = Boolean(window.navigator.share)

  return (
    <header className={`Header ${sticked ? 'Header-sticked' : ''}`}>
      <EventListener
        target="document"
        onKeyup={handleKeyUp}
        onClick={handleClickOutside}
        onScroll={handleScroll}
      />
      <div className="Header_bar">
        <div className="Header_logo">
          <Link to="/">{title}</Link>
        </div>
        <div className="Header_nav" aria-hidden={!toggled} ref={navRef}>
          {children}
        </div>
        <div className="Header_actions">
          {facebookUrl ? (
            <a
              href={facebookUrl}
              title="Facebook"
              aria-label={intl.formatMessage({ id: 'socials.facebook.label' })}
            >
              <Icon name="facebook" />
            </a>
          ) : null}
          {twitterUrl ? (
            <a
              href={twitterUrl}
              title="Twitter"
              aria-label={intl.formatMessage({ id: 'socials.twitter.label' })}
            >
              <Icon name="twitter" />
            </a>
          ) : null}
          {instagramUrl ? (
            <a
              href={instagramUrl}
              title="Instagram"
              aria-label={intl.formatMessage({ id: 'socials.instagram.label' })}
            >
              <Icon name="instagram" />
            </a>
          ) : null}
          <span className="Header_socialShare">
            <button
              type="button"
              onClick={handleShare}
              title={intl.formatMessage({
                id: canShare ? 'socials.share.label' : 'socials.copy.label',
              })}
              aria-label={intl.formatMessage({
                id: canShare ? 'socials.share.label' : 'socials.copy.label',
              })}
            >
              <Icon name="share" />
            </button>
            <span className="Header_socialCopied" aria-hidden={copied}>
              {intl.formatMessage({ id: 'socials.copy.copied' })}
            </span>
          </span>
          <button
            type="button"
            className="Header_navToggle"
            onClick={handleClick}
            ref={navRef}
            title={intl.formatMessage({ id: 'header.open' })}
          >
            <Icon name="hamburger" />
          </button>
        </div>
      </div>
    </header>
  )

  function handleShare() {
    const canonicalElement = window.document.querySelector(
      'link[rel="canonical"]'
    )
    const url = canonicalElement
      ? canonicalElement.getAttribute('href')
      : window.document.location.href

    if (window.navigator.share) {
      // Use Webshare API if supported
      const titleElement = window.document.querySelector('title')
      const title = titleElement ? titleElement.textContent : undefined
      const descriptionElement = window.document.querySelector(
        'meta[name="description"]'
      )
      const text = descriptionElement
        ? descriptionElement.getAttribute('content')
        : undefined

      window.navigator.share({
        title,
        text,
        url,
      })
    } else {
      // Fallback on copying the URL and make sure URL is absolute
      const absoluteUrl = new window.URL(url, window.document.baseURI).href
      window.navigator.clipboard.writeText(absoluteUrl)
      setCopied(true)
    }
  }

  function handleClick() {
    setToggled(toggled => !toggled)
  }

  function handleClickOutside(event) {
    if (
      navRef.current &&
      buttonRef.current &&
      !navRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setToggled(false)
    }
  }

  function handleScroll(event) {
    const document = event.target

    const distance =
      document.scrollTop ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    setSticked(0 < distance)
  }

  function handleKeyUp(event) {
    if (27 === event.keyCode) {
      setToggled(false)
    }
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  socials: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default Header
