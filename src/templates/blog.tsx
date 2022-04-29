import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/Layout'
import ProjectPagination from '../components/ProjectPagination'

import { BlogPostQuery, Mdx } from '../@types/graphql-generated-types'


type BlogPostProps = {
  mdx: BlogPostQuery["mdx"]
}

type PageContextProps = {
  id: string
  next?: Mdx
  prev?: Mdx
}

/*
 * pageContext : from gatsby-node.js getting the next and prev posts
 */
const BlogPost = ({
  data: {mdx},
  pageContext: {
    id,
    next,
    prev
  }}: PageProps<BlogPostProps, PageContextProps>) => {

  // console.log('pageContext test', pageContext)

  return (
    <Layout>
      <h1>{mdx?.frontmatter?.title}</h1>

      <p>Posted: {mdx?.frontmatter?.date}</p>
      <MDXRenderer>
        {mdx?.body ?? ''}
      </MDXRenderer>

      <hr />

      <ProjectPagination
        pathPrefix='blog'
        next={next}
        prev={prev} />

    </Layout>
  )
}

export const query = graphql`
  query BlogPost ($id: String) {
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