import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { getSrc, getImage } from 'gatsby-plugin-image'
import ContentLayout from '../components/ContentLayout'
import ProjectHeader from '../components/ProjectHeader'
import ProjectPagination from '../components/ProjectPagination'
import MdxImage from '../components/MdxImage'
import MdxGalleryImage from '../components/MdxGalleryImage'


const ProjectPost = ({data, pageContext}) => {
  const headerBlock = (
    <ProjectHeader frontmatter={data.mdx.frontmatter} />
  )

  // Parsing the gallery images into an object of (GatsbyImage components)
  // so they can be accessed in the MDX file
  var galleryImages = {}
  if (data.mdx.frontmatter.gallery) {
    data.mdx.frontmatter.gallery.forEach((image, i) => {
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
      ...ProjectMdxFrontmatterFragment
      frontmatter {
        gallery {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default ProjectPost