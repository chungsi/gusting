import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

const ListingsPage = ({ data }) => {

  const entry = (entry) => (
    <article key={entry.id}>
      <h2>
        <Link to={`/blog/${entry.slug}`}>
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
            {group.nodes.map(node => entry(node.childMdx))}
          </>
        )
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      group(field: sourceInstanceName) {
        fieldValue
        nodes {
          childMdx {
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
            slug
          }
        }
      }
    }
  }
`

export default ListingsPage