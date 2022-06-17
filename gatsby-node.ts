import type { GatsbyNode } from 'gatsby'
import * as path from 'path'
// const path = require('path')

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
        sort: {fields: childMdx___frontmatter___date, order: ASC}
      ) {
        nodes {
          id
          childMdx {
            slug
            id
            frontmatter {
              title
              templateType
            }
          }
        }
      }
    }
  `)

  if (query.errors) throw query.errors

  const allEntries = query.data.allFile.nodes

  allEntries.forEach((node, index) => {
    createPage({
      path: `${dir}/${node.childMdx.slug}`,
      component: path.resolve(`./src/templates/${node.childMdx.frontmatter.templateType ?? dir}.tsx`),
      context: {
        id: node.childMdx.id,
        next: index === 0 ? null : allEntries[index - 1],
        prev: index === allEntries.length - 1 ? null : allEntries[index + 1]
      }
    })
  });
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  await customCreatePages(graphql, actions, 'blog')
  await customCreatePages(graphql, actions, 'project')
}

// exports.createPages = async ({ graphql, actions }) => {
//   await customCreatePages(graphql, actions, 'blog')
//   await customCreatePages(graphql, actions, 'project')
// }