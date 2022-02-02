import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { getImage } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import ContentLayout from '../components/ContentLayout'
import ProjectHeader from '../components/ProjectHeader'
import ProjectPagination from '../components/ProjectPagination'
import MdxImage from '../components/MdxImage'
import MdxGalleryImage from '../components/MdxGalleryImage'


const ProjectPost = ({location, data, pageContext}) => {
  console.log('location: ', location)
  console.log('URL href: ', (new URL(location.href)))

  // Get the param for which homepage the user navigated to ths page from;
  // The query param is set on the individual homepages
  const paramKey = useSiteMetadata().homeUrlParamName
  var homeUrlParam = null
  if (location.href) {
    const urlParams = (new URL(location.href)).searchParams
    homeUrlParam = urlParams.has(paramKey) ? urlParams.get(paramKey) : null
  }
  // const homeUrlParam = null


  // Parsing the gallery images into an object of (GatsbyImage components)
  // so they can be accessed in the MDX file
  var galleryImages = {}
  if (data.mdx.frontmatter.gallery) {
    data.mdx.frontmatter.gallery.forEach((image, i) => {
      galleryImages[`image${i}`] = getImage(image)
    })
  }

  return (
    <ContentLayout
      homeUrl={homeUrlParam}
      className={data.mdx.frontmatter.category}
      header={<ProjectHeader frontmatter={data.mdx.frontmatter}/>} >

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