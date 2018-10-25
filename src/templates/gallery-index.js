import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import PageTitle from '../components/page-title/PageTitle'
import Markdown from '../components/utils/Markdown'

export default function GalleryIndexTemplate({ data }) {
  const page = {
    htmlAst: data.page.htmlAst,
    ...data.page.fields,
    ...data.page.frontmatter,
    galleries: data.galleries.edges.map(edge => ({
      ...edge.node.fields,
      ...edge.node.frontmatter,
    })),
  }
  // eslint-disable-next-line
  console.log(page.contents)
  return (
    <Layout page={page}>
      <PageTitle>{page.title}</PageTitle>
      <Markdown html={page.htmlAst} />
    </Layout>
  )
}

GalleryIndexTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!, $regex: String!) {
    ...PageFragment
    ...GalleriesFragment
  }
`
