module.exports = {
  siteMetadata: {
    siteUrl: 'https://raba.tel',
    title: 'Camille Rabatel',
    description: "Site de photographie de Camille Rabatel",
    keywords: 'photo, photograhie, paysage, oiseaux, animalier, photography, landscape, wildlife, nature, bird, astro',
    author: 'Camille Rabatel',
    locale: 'fr',
    socials: {
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: 'https://www.instagram.com/camille.rabatel',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-component',
          'gatsby-remark-unwrap-images',
          {
            resolve: 'gatsby-remark-image',
            options: {
              maxWidth: 900,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-78711157-2',
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Camille Rabatel',
        short_name: 'C. R. Photo.',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#000000',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {
                  frontmatter: { index: { ne: true } }
                  fields: { section: { eq: "article" } }
                }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: 'Camille Rabatel',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/src/admin/index.js`,
      },
    },
  ],
}
