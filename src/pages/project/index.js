import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'

const ProjectPage = ({ data }) => {

  const entryListing = (entry) => {
    return (
      <article key={entry.id}>
        <h2>
          <Link to={`/blog/${entry.slug}`}>
            {entry.frontmatter.title}
          </Link>
        </h2>
      </article>
    )
  }

  return (
    <Layout pageTitle="Projects">
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
      filter: {dir: {regex: "/project/"}}
      sort: {fields: childMdx___frontmatter___date, order: DESC}
    ) {
      nodes {
        childMdx {
          frontmatter {
            title
          }
          id
          slug
        }
      }
    }
  }
`

export default ProjectPage