import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'
import ProjectPagination from '../components/projectPagination'

/*
 * pageContext : from gatsby-node.js getting the next and prev posts
 */
const BlogPost = ({data, pageContext}) => {

  return (
    <Layout>
      <h1>{data.mdx.frontmatter.title}</h1>

      <p>Posted: {data.mdx.frontmatter.date}</p>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>

      <hr />

      <ProjectPagination
        pathPrefix='blog'
        next={pageContext.next}
        prev={pageContext.prev} />

    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`

export default BlogPost