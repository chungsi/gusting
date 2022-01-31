import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const BlogPage = ({ data }) => {

  const entryListing = (entry) => {
    return (
      <article key={entry.id}>
        <h4>
          <Link to={`/blog/${entry.slug}`}>
            {entry.frontmatter.title}
          </Link>
        </h4>
        <p>Posted: {entry.frontmatter.date}</p>
      </article>
    )
  }

  return (
    <Layout pageTitle="My Blog Posts">
      {
        data.allFile.nodes.map((node) => {
          return entryListing(node.childMdx)
        })
      }
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {sourceInstanceName: {eq: "blog"}}
      sort: {fields: childMdx___frontmatter___date, order: DESC}
    ) {
      nodes {
        childMdx {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
          id
          slug
        }
      }
    }
  }
`

export default BlogPage