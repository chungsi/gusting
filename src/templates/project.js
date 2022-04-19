import * as React from 'react'
import { getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import ContentLayout from '../components/Layout/ContentLayout'
import ProjectHeader from '../components/ProjectHeader'
// import ProjectPagination from '../components/ProjectPagination'
import MdxImage from '../components/Mdx/MdxImage'
import MdxGalleryImage from '../components/Mdx/MdxGalleryImage'
import MdxGrid from '../components/Mdx/MdxGrid'

import { concat } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'


const ProjectPost = ({location, data, pageContext}) => {
  // console.log('location: ', location)
  // console.log('URL href: ', (new URL(location.href)))

  // Get the param for which homepage the user navigated to ths page from;
  // The query param is set on the individual homepages
  const paramKey = useSiteMetadata().homeUrlParamName
  var homeUrlParam = null
  if (location.href) {
    const urlParams = (new URL(location.href)).searchParams
    homeUrlParam = urlParams.has(paramKey) ? urlParams.get(paramKey) : null
  }

  // Parsing the gallery images into an object of (GatsbyImage components)
  // so they can be accessed in the MDX file
  var galleryImages = {}
  if (data.mdx.frontmatter.gallery) {
    data.mdx.frontmatter.gallery.forEach((image, i) => {
      // If gatsbyImageData exists
      if (getImage(image) != null) {
        galleryImages[`image${i+1}`] = getImage(image)
      } else {
        galleryImages[`image${i+1}`] = image.publicURL
        console.log(`image${i+1}`, image.publicURL)
      }
    })
  }

  return (
    <ContentLayout
      homeUrl={homeUrlParam}
      header={<ProjectHeader frontmatter={data.mdx.frontmatter}/>}
      bodyClassName={concat(
        data.mdx.frontmatter.category,
        'border-b-8 border-solid border-th-primary'
      )}
      className='max-w-6xl pb-2xl'
    >

      <MDXProvider components={{MdxImage, MdxGalleryImage, MdxGrid}}>
        <MDXRenderer gallery={galleryImages}>
          {data.mdx.body}
        </MDXRenderer>
      </MDXProvider>

      {/* <ProjectPagination
        pathPrefix='project'
        pathSuffix={`?${paramKey}=${homeUrlParam}`}
        next={pageContext.next}
        prev={pageContext.prev}
      /> */}

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
          publicURL
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default ProjectPost