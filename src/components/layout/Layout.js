import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'

import Store from '../store/Store'
import Locale from '../locale/Locale'
import Page from '../page/Page'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Main from '../main/Main'
import Navigation from '../navigation/Navigation'
import Studio from '../studio/Studio'

import './Layout.css'
import avatar from '../../images/avatar.jpg'

export const PageContext = React.createContext()

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    page: PropTypes.object,
  }

  renderPage(page, children, site, location) {
    const title = page ? page.title : undefined
    const description = page ? page.description : undefined
    const image =
      page && page.banner ? page.banner.childImageSharp.original.src : undefined
    const locale = page && page.locale ? page.locale : site.locale

    return (
      <PageContext.Provider value={page}>
        <Locale locale={locale}>
          <Store>
            <Helmet>
              <html lang={locale} />
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <title>
                {title ? title + ' | ' : ''}
                {site.title}
              </title>
              <meta name="description" content={site.description} />
              <meta name="author" content={site.author} />
              <meta name="keywords" content={site.keywords} />
              <link rel="canonical" href={location.pathname} />
              <meta property="og:locale" content={locale} />
              <meta property="og:title" content={title ? title : site.title} />
              <meta
                property="og:description"
                content={description ? description : site.description}
              />
              <meta property="og:type" content="article" />
              <meta property="og:url" content={location.pathname} />
              <meta property="og:site_name" content={site.title} />
              <meta property="og:image" content={image ? image : avatar} />
            </Helmet>
            <Page>
              <Main>{children}</Main>
              <Header title={site.title} socials={site.socials}>
                <Navigation />
              </Header>
              <Footer author={site.author} socials={site.socials} />
              <Studio />
            </Page>
          </Store>
        </Locale>
      </PageContext.Provider>
    )
  }

  render() {
    const { page, children } = this.props

    return (
      <Location>
        {({ location }) => (
          <StaticQuery
            query={graphql`
              query SiteQuery {
                site {
                  ...SiteFragment
                }
              }
            `}
            render={data =>
              this.renderPage(page, children, data.site.siteMetadata, location)
            }
          />
        )}
      </Location>
    )
  }
}

export const siteFragment = graphql`
  fragment SiteFragment on Site {
    siteMetadata {
      title
      description
      keywords
      author
      locale
      socials {
        facebookUrl
        twitterUrl
        instagramUrl
      }
    }
  }
`
