import React from 'react'

import Layout from '../components/layout/Layout'
import { PageSeparator } from '../components/page/Page'
import GalleryList from '../components/gallery-list/GalleryList'
import Container from '../components/container/Container'
import ArticleList from '../components/article-list/ArticleList'

export default function IndexPage() {
  return (
    <Layout>
      <GalleryList />
      <Container>
        <PageSeparator />
        <ArticleList />
      </Container>
    </Layout>
  )
}
