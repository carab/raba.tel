import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import PageTitle from '../components/page-title/PageTitle'
import Markdown from '../components/utils/Markdown'
import Gallery from '../components/gallery/Gallery'

export default function GalleryTemplate({ data }) {
  const page = {
    htmlAst: data.page.htmlAst,
    ...data.page.fields,
    ...data.page.frontmatter,
  }

  return (
    <Layout page={page}>
      <PageTitle>{page.title}</PageTitle>
      <Gallery {...page}>
        <Markdown html={page.htmlAst} />
      </Gallery>
    </Layout>
  )
}

GalleryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    ...PageFragment
  }
`
