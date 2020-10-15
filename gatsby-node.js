/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require(`fs`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    const parts = slug.split('/')
    const section = parts[1]
    createNodeField({
      node,
      name: `section`,
      value: section,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                section
              }
              frontmatter {
                layout
                index
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: resolveTemplate(node),
          context: {
            slug: node.fields.slug,
            regex: `/${node.fields.slug}.+/`,
          },
        })
      })

      resolve()
    })
  })
}

function resolveTemplate(node) {
  let template = 'default'

  if (node.frontmatter.layout) {
    template = node.frontmatter.layout
  } else if (node.fields.section) {
    if (node.frontmatter.index) {
      template = node.fields.section + '-index'
    } else {
      template = node.fields.section
    }
  } else if (node.frontmatter.index) {
    template = 'index'
  }

  let file = resolvePath(template)

  if (fs.existsSync(file)) {
    return file
  }

  return resolvePath('default')
}

function resolvePath(template) {
  return path.resolve(`./src/templates/${template}.js`)
}
