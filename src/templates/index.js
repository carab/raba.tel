import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import Container from '../components/container/Container'
import Markdown from '../components/utils/Markdown'
import { PageSeparator } from '../components/page/Page'
import GalleryList from '../components/gallery-list/GalleryList'
import ArticleList from '../components/article-list/ArticleList'

export default function IndexTemplate({ data }) {
  const page = {
    htmlAst: data.page.htmlAst,
    ...data.page.fields,
    ...data.page.frontmatter,
    articles: data.articles.edges.map(edge => ({
      ...edge.node.fields,
      ...edge.node.frontmatter,
    })),
    galleries: data.galleries.edges.map(edge => ({
      ...edge.node.fields,
      ...edge.node.frontmatter,
    })),
  }

  return (
    <Layout page={page}>
      <GalleryList galleries={page.galleries} />
      <Container>
        <Markdown html={page.htmlAst} />
        <PageSeparator />
        <ArticleList articles={page.articles} />
      </Container>
    </Layout>
  )
}

IndexTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!, $regex: String!) {
    ...PageFragment
    ...GalleriesFragment
    ...ArticlesFragment
  }
`
