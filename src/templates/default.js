import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import Container from '../components/container/Container'
import PageTitle from '../components/page-title/PageTitle'
import Markdown from '../components/utils/Markdown'

export default function DefaultTemplate({ data }) {
  const page = {
    htmlAst: data.page.htmlAst,
    ...data.page.fields,
    ...data.page.frontmatter,
  }

  return (
    <Layout page={page}>
      <Container>
        <PageTitle>{page.title}</PageTitle>
        <Markdown html={page.htmlAst} />
      </Container>
    </Layout>
  )
}

DefaultTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    ...PageFragment
  }
`

export const pageFragment = graphql`
  fragment PageFragment on Query {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      fields {
        slug
        section
      }
      frontmatter {
        layout
        index
        title
        date
        description
        locale
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
export const contentFragment = graphql`
  fragment ContentFragment on MarkdownRemark {
    fields {
      slug
      section
    }
    frontmatter {
      title
      date
      description
      weight
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
    }
  }
`

export const galleriesFragment = graphql`
  fragment GalleriesFragment on Query {
    galleries: allMarkdownRemark(
      filter: {
        fields: { section: { eq: "gallery" }, slug: { regex: $regex } }
        frontmatter: { index: { ne: true } }
      }
      sort: { fields: [frontmatter___weight], order: DESC }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
  }
`

export const articlesFragment = graphql`
  fragment ArticlesFragment on Query {
    articles: allMarkdownRemark(
      filter: {
        fields: { section: { eq: "article" }, slug: { regex: $regex } }
        frontmatter: { index: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
  }
`
