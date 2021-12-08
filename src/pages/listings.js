import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const ListingsPage = ({ data }) => {

  const entry = (entry, parentDir) => (
    <article key={entry.id}>
      <h2>
        <Link to={`/${parentDir}/${entry.slug}`}>
          {entry.frontmatter.title}
        </Link>
      </h2>
    </article>
  )

  return (
    <Layout pageTitle="All of the Things">
      {
        data.allFile.group.map(group =>
          <>
            <h2 key={group.fieldValue}>{group.fieldValue}</h2>
            {group.nodes.map(node => entry(node.childMdx, group.fieldValue))}
          </>
        )
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(filter: {extension: {eq: "mdx"}}) {
      group(field: sourceInstanceName) {
        fieldValue
        nodes {
          childMdx {
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
            slug
            id
          }
        }
      }
    }
  }
`

export default ListingsPage