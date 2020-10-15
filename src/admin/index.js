import React from 'react'
import CMS from 'netlify-cms-app'
import Pellicule from '../components/pellicule/Pellicule'

CMS.registerEditorComponent({
  id: 'photo-list',
  label: 'Pellicule',
  fields: [{ name: 'body', label: 'Images', widget: 'markdown', editor_components: ['image'] }],
  pattern: /^<photo-list>([\s\S]+?)<\/photo-list>$/im,
  fromBlock(match) {
    return {
      body: match[1],
    }
  },
  toBlock(obj) {
    return `<photo-list>
${obj.body}
</photo-list>`
  },
  toPreview(obj) {
    return <Pellicule>{obj.body}</Pellicule>
  },
})
