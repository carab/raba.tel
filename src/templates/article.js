import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import Markdown from '../components/utils/Markdown'
import Article from '../components/article/Article'

export default function ArticleTemplate({ data }) {
  const page = {
    htmlAst: data.page.htmlAst,
    ...data.page.fields,
    ...data.page.frontmatter,
  }

  return (
    <Layout page={page}>
      <Article {...page}>
        <Markdown html={page.htmlAst} />
      </Article>
    </Layout>
  )
}

ArticleTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    ...PageFragment
  }
`
