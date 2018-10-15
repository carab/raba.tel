import React from 'react'
import rehypeReact from 'rehype-react'

import ContactForm from '../contact-form/ContactForm'
import Pellicule from '../pellicule/Pellicule'
import Photo from '../photo/Photo'
import ArticleList from '../article-list/ArticleList'
import GalleryList from '../gallery-list/GalleryList'

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'contact-form': ContactForm,
    'photo-list': Pellicule,
    'article-list': ArticleList,
    'gallery-list': GalleryList,
    img: Img,
  },
}).Compiler

export default function Markdown({ html }) {
  return renderAst(html)
}

function Img({
  'data-ratio': ratio,
  'data-original': original,
  src,
  srcSet,
  sizes,
  ...props
}) {
  ratio = parseFloat(ratio)
  
  return (
    <Photo
      {...props}
      ratio={ratio}
      original={{ src: original }}
      sizes={{
        aspectRatio: ratio,
        src,
        srcSet,
        sizes,
      }}
    />
  )
}
