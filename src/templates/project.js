import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { getSrc, getImage } from 'gatsby-plugin-image'
import ContentLayout from '../components/contentLayout'
import ProjectHeader from '../components/projectHeader'
import ProjectPagination from '../components/projectPagination'
import MdxImage from '../components/mdxImage'
import MdxGalleryImage from '../components/mdxGalleryImage'


const ProjectPost = ({data, pageContext}) => {
  const headerBlock = (
    <ProjectHeader
        title={data.mdx.frontmatter.title}
        subtitle={data.mdx.frontmatter.subtitle}
        category={data.mdx.frontmatter.category}
        heroImgSrc={getSrc(data.mdx.frontmatter.hero_image)} />
  )

  // Parsing the gallery images into an object of (GatsbyImage components)
  // so they can be accessed in the MDX file
  var galleryImages = {}
  if (data.mdx.frontmatter.images) {
    data.mdx.frontmatter.images.forEach((image, i) => {
      galleryImages[`image${i}`] = getImage(image)
    })
  }

  console.log(galleryImages)
  console.log(pageContext)

  return (
    <ContentLayout
      className={data.mdx.frontmatter.category}
      header={headerBlock}
    >

      {/* Do I want to automatically parse h1's as h2's etc in the mdx??? */}
      <MDXProvider components={{MdxGalleryImage, MdxImage}}>
        <MDXRenderer gallery={galleryImages}>
          {data.mdx.body}
        </MDXRenderer>
      </MDXProvider>

      <hr />
      <ProjectPagination
        pathPrefix='project'
        next={pageContext.next}
        prev={pageContext.prev} />

    </ContentLayout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      body
      frontmatter {
        title
        subtitle
        category
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        images {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default ProjectPost