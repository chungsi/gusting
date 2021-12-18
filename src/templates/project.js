import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import ProjectHeader from '../components/projectHeader'
import ProjectPagination from '../components/projectPagination'

const ProjectPost = ({data, pageContext}) => {

  return (
    <Layout>
      <ProjectHeader content={data.mdx.frontmatter} />
      <GatsbyImage
        image={getImage(data.mdx.frontmatter.hero_image)}
        alt={data.mdx.frontmatter.hero_image_alt}
      />
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>

      <hr />
      <ProjectPagination
        pathPrefix='project'
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
        subtitle
        category
        hero_image_alt
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`

export default ProjectPost