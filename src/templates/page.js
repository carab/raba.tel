import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import Container from '../components/container/Container'
import About from '../components/about/About'
import PageTitle from '../components/page-title/PageTitle'
import Markdown from '../components/utils/Markdown'
import Gallery from '../components/gallery/Gallery'
import Article from '../components/article/Article'

export const PageContext = React.createContext()

const LAYOUTS = {
  about: AboutLayout,
  default: DefaultLayout,
  gallery: GalleryLayout,
  article: ArticleLayout,
}

function DefaultLayout({ page, children }) {
  return (
    <Layout>
      <Container>
        <PageTitle>{page.title}</PageTitle>
        {children}
      </Container>
    </Layout>
  )
}

DefaultLayout.propTypes = {
  page: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

function AboutLayout({ page, children }) {
  return (
    <Layout>
      <Container>
        <About title={page.title}>{children}</About>
      </Container>
    </Layout>
  )
}

AboutLayout.propTypes = {
  page: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

function GalleryLayout({ page, children }) {
  return (
    <Layout>
      <PageTitle>{page.title}</PageTitle>
      {page.index ? children : <Gallery {...page}>{children}</Gallery>}
    </Layout>
  )
}

GalleryLayout.propTypes = {
  page: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

function ArticleLayout({ page, children }) {
  return (
    <Layout>
      {page.index ? (
        <>
          <PageTitle>{page.title}</PageTitle>
          {children}
        </>
      ) : (
        <Article {...page}>{children}</Article>
      )}
    </Layout>
  )
}

ArticleLayout.propTypes = {
  page: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default function Page({ data }) {
  const page = {
    htmlAst: data.markdownRemark.htmlAst,
    ...data.markdownRemark.fields,
    ...data.markdownRemark.frontmatter,
  }

  const Layout =
    LAYOUTS[page.layout] || LAYOUTS[page.section] || LAYOUTS.default

  return (
    <PageContext.Provider value={page}>
      <Layout page={page}>
        <Markdown html={page.htmlAst} />
      </Layout>
    </PageContext.Provider>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fields {
        slug
        section
        index
      }
      frontmatter {
        layout
        title
        date
        description
        banner {
          childImageSharp {
            original {
              width
              height
              src
            }
            sizes(maxWidth: 900) {
              src
              srcSet
              aspectRatio
              sizes
            }
          }
        }
        resources {
          title
          src {
            id
            childImageSharp {
              original {
                width
                height
                src
              }
              sizes(maxWidth: 600) {
                src
                srcSet
                aspectRatio
                sizes
              }
            }
          }
        }
      }
    }
  }
`
