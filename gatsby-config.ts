import type { GatsbyConfig } from 'gatsby'

// module.exports = {
const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata: {
    title: "chungsi",
    // TODO: is this needed?
    description: "web dev & design & art",
    siteUrl: "https://www.chungsi.io",
    homeUrlParamName: "home",
    artHome: {
      title: "chungsi",
      subtitle: "designer / storymaker / artist",
      metaTitle: "chungsi | designer & storymaker",
      homeUrlParam: "art",
      // TODO: Do I want a meta description for the pages?
      // metaDescription: '',
    },
    designHome: {
      title: "ashley",
      subtitle: "web developer / designer / storymaker",
      metaTitle: "ashley | web dev & design",
      homeUrlParam: "design",
      // metaDescription: '',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
        jsxPragma: "jsx",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "chungsi | web dev & design & art",
        short_name: "chungsi",
        description: "a portfolio",
        start_url: "/",
        // TODO: update favicon later with multiple sizes
        icon: "src/images/icon.png",
        theme_color_in_head: false,
      },
    },
    // {
    //   resolve: `gatsby-plugin-sass`,
    //   options: {
    //     postCssPlugins: [
    //       require('tailwindcss'),
    //       require('./tailwind.config.js')
    //     ]
    //   }
    // },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          import: true,
          modules: true,
        },
        postCssPlugins: [
          require("postcss-import"),
          require("postcss-pow"),
          require("tailwindcss/nesting"),
          require("tailwindcss"),
          require("autoprefixer"),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ["auto", "webp"],
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
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
        extensions: [".md", ".mdx"],
        // gatsby-remark-images needs to be both a sub-plugin of gatsby-plugin-mdx
        // and a string entry in the plugins array.
        plugins: ["gatsby-remark-images"],
        gatsbyRemarkPlugins: [
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-images/?=gatsby-remark
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1000,
            },
          },
          {
            // https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/?=gatsby-remark
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `autolink`,
              elements: [`h1`, `h2`, `h3`, `h4`],
              enableCustomId: true,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
          // include: `${__dirname}/src/`
        },
      },
    },
  ],
}

export default config