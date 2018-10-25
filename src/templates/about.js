import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/layout/Layout'
import Container from '../components/container/Container'
import About from '../components/about/About'
import Markdown from '../components/utils/Markdown'

export default function AboutTemplate({ data }) {
  const page = {
    htmlAst: data.page.htmlAst,
    ...data.page.fields,
    ...data.page.frontmatter,
  }

  return (
    <Layout page={page}>
      <Container>
        <About title={page.title}>
          <Markdown html={page.htmlAst} />
        </About>
      </Container>
    </Layout>
  )
}

AboutTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($slug: String!) {
    ...PageFragment
  }
`
