import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const BlogPost = ({data, pageContext}) => {
  const image = getImage(data.mdx.frontmatter.hero_image)

  console.log(pageContext)
  console.log(data)
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>

      <p>{pageContext.next && (pageContext.next.childMdx.slug)}</p>
      <p>{pageContext.prev && (pageContext.prev.childMdx.slug)}</p>
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