const path = require('path')

const customCreatePages = async (graphql, actions, dir) => {
  const { createPage } = actions
  const query = await graphql(`
    query {
      allFile(
        filter: {sourceInstanceName: {eq: "${dir}"}, extension: {eq: "mdx"}}
      ) {
        nodes {
          id
          childMdx {
            slug
            id
          }
        }
      }
    }
  `)

  if (query.errors) throw query.errors

  const allEntries = query.data.allFile.nodes

  query.data.allFile.nodes.forEach((node, index) => {
    createPage({
      path: `${dir}/${node.childMdx.slug}`,
      component: path.resolve(`./src/templates/${dir}.js`),
      context: {
        id: node.childMdx.id,
        next: index === 0 ? null : allEntries[index - 1],
        prev: index === allEntries.length - 1 ? null : allEntries[index + 1]
      }
    })
  });
}

exports.createPages = async ({ graphql, actions }) => {
  console.log(actions)

  await customCreatePages(graphql, actions, 'blog')
  await customCreatePages(graphql, actions, 'project')
}