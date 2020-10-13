import React from 'react'
import PropTypes from 'prop-types'

import './Footer.css'

export default function Footer({
  author,
  socials: { fivehundredpxUrl, facebookUrl, instagramUrl, twitterUrl },
}) {
  const date = new Date()

  return (
    <footer className="Footer">
      <p>
        &copy; {date.getFullYear()} - {author}
      </p>

      <p className="Footer_credit">
        Icons by <br />
        {/* camera */}
        <a
          href="https://www.flaticon.com/authors/madebyoliver"
          title="Madebyoliver"
        >
          Madebyoliver
        </a>
        ,{/* close */}{' '}
        <a href="https://www.flaticon.com/authors/google" title="Google">
          Google
        </a>
        ,{/* next, previous */}{' '}
        <a
          href="https://www.flaticon.com/authors/gregor-cresnar"
          title="Gregor Cresnar"
        >
          Gregor Cresnar
        </a>
        ,{/* 500px */}{' '}
        {fivehundredpxUrl ? (
          <a href="http://www.freepik.com" title="Freepik">
            Freepik,
          </a>
        ) : null}
        {/* Facebook */}{' '}
        {facebookUrl ? (
          <a
            href="https://www.flaticon.com/authors/simpleicon"
            title="SimpleIcon"
          >
            SimpleIcon,
          </a>
        ) : null}
        {/* Instagram */}{' '}
        {instagramUrl ? (
          <a href="http://www.freepik.com" title="Freepik">
            Freepik
          </a>
        ) : null}
        ,{/* Twitter */}{' '}
        {twitterUrl ? (
          <a
            href="https://www.flaticon.com/authors/elegant-themes"
            title="Elegant Themes"
          >
            Elegant Themes,
          </a>
        ) : null}
        {/* plus and close2 */}{' '}
        <a href="https://www.flaticon.com/authors/lyolya" title="Lyolya">
          Lyolya
        </a>{' '}
        ,{/* hamburger */} and{' '}
        <a
          href="https://www.flaticon.com/authors/chris-veigt"
          title="Chris Veigt"
        >
          Chris Veigt
        </a>
        <br />
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{' '}
        are licensed by{' '}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
        >
          CC 3.0 BY
        </a>
      </p>
    </footer>
  )
}

Footer.propTypes = {
  author: PropTypes.string.isRequired,
  socials: PropTypes.object.isRequired,
}
