import * as React from 'react'
import { Link, graphql, PageProps } from 'gatsby'

import Layout from '../components/Layout'

const BlogPage = ({ data: {allFile} }: PageProps<{allFile:Queries.BlogPageQuery['allFile']}>) => {

  return (
    <Layout>
      {
        allFile.nodes.map((node) =>
          <article key={node?.childMdx?.id}>
            <h4>
              <Link to={`/blog/${node?.childMdx?.slug}`}>
                {node?.childMdx?.frontmatter?.title}
              </Link>
            </h4>
            <p>Posted: {node?.childMdx?.frontmatter?.date}</p>
          </article>
        )
      }
    </Layout>
  )
}

export const query = graphql`
  query BlogPage {
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