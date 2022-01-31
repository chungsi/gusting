import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const ProjectPage = ({ data }) => {

  const entryListing = (entry) => {
    return (
      <article key={entry.id}>
        <h4>
          <Link to={`/project/${entry.slug}`}>
            {entry.frontmatter.title}
          </Link>
        </h4>
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
      filter: {sourceInstanceName: {eq: "project"}, extension: {eq: "mdx"}}
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