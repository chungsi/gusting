import * as React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'

const BlogPost = ({data, pageContext}) => {

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>

      {pageContext.next &&
        <Link to={'/blog/'+pageContext.next.childMdx.slug}>
          <p>{pageContext.next.childMdx.frontmatter.title}</p>
        </Link>
      }
      {pageContext.prev &&
        <Link to={'/blog/'+pageContext.prev.childMdx.slug}>
          <p>{pageContext.prev.childMdx.frontmatter.title}</p>
        </Link>
      }

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