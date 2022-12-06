import type { GatsbyNode } from 'gatsby'
import * as path from 'path'
// const path = require('path')
import { slugify } from './src/utils/helpers'

const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === 'Mdx') {
     createNodeField({
      node,
      name: `slug`,
      value: createFilePath({ node, getNode })
     })
  }
}

/* TODO: Proper sorting of entries -> put an actual date field in entries? */
const customCreatePages = async (graphql, actions, reporter, dir) => {
  const { createPage } = actions
  const query = await graphql(`
    query CreatePages {
      allFile(
        filter: {
          sourceInstanceName: {eq: "${dir}"},
          extension: {eq: "mdx"},
          name: {regex: "/^[^_]/"},
          childMdx: {frontmatter: {publish: {eq: true}}}
        }
      ) {
        nodes {
          childMdx {
            id
            fields { slug }
            frontmatter {
              title
              templateType
            }
            internal { contentFilePath }
          }
        }
      }
    }
  `)

  if (query.errors) {
    reporter.panicOnBuild('Error loading MDX result', query.errors)
  }

  const allEntries = query.data.allFile.nodes

  // allEntries.forEach((node, index) => {
  //   const entryTemplate = path.resolve(`./src/templates/${node.childMdx.frontmatter.templateType ?? dir}.tsx`)
  //   createPage({
  //     path: slugify(`${dir}/${node.childMdx.fields.slug}`),
  //     component: `${entryTemplate}?__contentFilePath=${node.childMdx.internal.contentFilePath}`,
  //     context: {
  //       id: node.childMdx.id,
  //       // next: index === 0 ? null : allEntries[index - 1],
  //       // prev: index === allEntries.length - 1 ? null : allEntries[index + 1]
  //     }
  //   })
  // })
  allEntries.forEach((node) => {
    // const componentName = `${dir[0].toUpperCase() + dir.substr(1)}Layout`
    // const entryTemplate = path.resolve(`./src/templates/test.tsx`)

    createPage({
      path: slugify(`${dir}/${node.childMdx.fields.slug}`),
      // component: path.resolve(
      //   `./src/templates/test.tsx?__contentFilePath=${node.childMdx.internal.contentFilePath}`
      // ),
      component: `${path.resolve(`./src/templates/test.tsx`)}?__contentFilePath=${node.childMdx.internal.contentFilePath}`,
      context: { id: node.childMdx.id },
    })
  })
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  // await customCreatePages(graphql, actions, 'blog')
  // await customCreatePages(graphql, actions, 'project')
  await customCreatePages(graphql, actions, reporter, 'test')
}

// exports.createPages = async ({ graphql, actions }) => {
//   await customCreatePages(graphql, actions, 'blog')
//   await customCreatePages(graphql, actions, 'project')
// }