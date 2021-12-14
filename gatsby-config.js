module.exports = {
  siteMetadata: {
    title: "gusting",
  },
  plugins: [
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
    // gatsby-remark-images needs to be both a sub-plugin of gatsby-plugin-mdx
    // and a string entry in the plugins array.
    'gatsby-remark-images',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-images/?=gatsby-remark
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 560
            }
          },
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/?=gatsby-remark
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `autolink`,
              elements: [`h1`, `h2`]
            }
          }
        ],
      }
    },
  ],
};
