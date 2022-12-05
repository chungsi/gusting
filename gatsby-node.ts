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
const customCreatePages = async (graphql, actions, dir) => {
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
          id
          childMdx {
            id
            fields { slug }
            frontmatter {
              title
              templateType
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (query.errors) throw query.errors

  const allEntries = query.data.allFile.nodes

  allEntries.forEach((node, index) => {
    const entryTemplate = path.resolve(`./src/templates/${node.childMdx.frontmatter.templateType ?? dir}.tsx`)
    createPage({
      path: slugify(`${dir}/${node.childMdx.fields.slug}`),
      component: `${entryTemplate}?__contentFilePath=${node.childMdx.internal.contentFilePath}`,
      context: {
        id: node.childMdx.id,
        next: index === 0 ? null : allEntries[index - 1],
        prev: index === allEntries.length - 1 ? null : allEntries[index + 1]
      }
    })
  });
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  // await customCreatePages(graphql, actions, 'blog')
  await customCreatePages(graphql, actions, 'project')
}

// exports.createPages = async ({ graphql, actions }) => {
//   await customCreatePages(graphql, actions, 'blog')
//   await customCreatePages(graphql, actions, 'project')
// }