// import remarkUnwrapImages from 'remark-unwrap-images'

module.exports = {
  siteMetadata: {
    title: 'chungsi',
    subtitle: 'designer / storymaker / artist',
    homeUrlParamName: 'home',
    artHome: {
      title: 'chungsi',
      subtitle: 'designer / storymaker / artist',
      homeUrlParam: 'art',
    },
    designHome: {
      title: 'ashley',
      subtitle: 'web developer / designer / storymaker',
      homeUrlParam: 'design',
    }
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('./tailwind.config.js')
        ]
      }
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp', 'avif']
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `project`,
        path: `${__dirname}/content/project`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        // gatsby-remark-images needs to be both a sub-plugin of gatsby-plugin-mdx
        // and a string entry in the plugins array.
        plugins: [
          'gatsby-remark-images'
        ],
        gatsbyRemarkPlugins: [
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-images/?=gatsby-remark
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000
            }
          },
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/?=gatsby-remark
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `autolink`,
              elements: [`h1`, `h2`, `h3`]
            }
          },
        ],
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/
          // include: `${__dirname}/src/`
        }
      }
    }
  ],
};
