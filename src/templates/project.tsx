import * as React from 'react'
import { getImage, IGatsbyImageData, ImageDataLike } from 'gatsby-plugin-image'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import ContentLayout from '../components/Layout/ContentLayout'
import ProjectHeader from '../components/ProjectHeader'
// import ProjectPagination from '../components/ProjectPagination'
import MdxImage from '../components/Mdx/MdxImage'
import MdxGalleryImage from '../components/Mdx/MdxGalleryImage'
import MdxGrid from '../components/Mdx/MdxGrid'

import { concat } from '../utils/helpers'
import type { ProjectTemplateQuery } from '../@types/graphql-generated-types'
import { useSiteMetadata } from '../hooks/useSiteMetadata'


type ProjectTemplateProps = {
  mdx: ProjectTemplateQuery["mdx"]
  location?: PageProps["location"]
  pageContext?: PageProps["pageContext"]
}

const ProjectTemplate = ({ data: {mdx}, location, pageContext }: PageProps<ProjectTemplateProps>) => {

  // Get the param for which homepage the user navigated to ths page from;
  // The query param is set on the individual homepages
  const paramKey = useSiteMetadata()?.homeUrlParamName ?? ''
  var homeUrlParam: string | null = null
  if (location.href) {
    const urlParams = (new URL(location.href)).searchParams
    homeUrlParam = urlParams.has(paramKey) ? urlParams.get(paramKey) : null
  }

  // Parsing the gallery images into an object of (GatsbyImage components)
  // so they can be accessed in the MDX file
  var galleryImages: Record<string, string | IGatsbyImageData> = {}
  if (mdx?.frontmatter?.gallery) {
    mdx.frontmatter.gallery.forEach((image, i) => {
      // TODO: better way to check existence and cast as type?
      console.log('testing condition check', image?.childImageSharp, image?.childImageSharp?.gatsbyImageData)
      if (image?.childImageSharp != null) {
        galleryImages[`image${i+1}`] = getImage(image as IGatsbyImageData) ?? ''
      } else {
        galleryImages[`image${i+1}`] = image?.publicURL ?? ''
      }
    })
  }

  console.log('gallery test', galleryImages)

  return (
    <ContentLayout
      homeUrl={homeUrlParam}
      header={<ProjectHeader frontmatter={mdx?.frontmatter!}/>}
      bodyClassName={concat(
        mdx?.frontmatter?.category ?? '',
        'border-b-8 border-solid border-th-primary'
      )}
      className='max-w-6xl pb-2xl'
    >

      <MDXProvider components={{MdxImage, MdxGalleryImage, MdxGrid}}>
        <MDXRenderer gallery={galleryImages}>
          {mdx?.body ?? ''}
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
  query ProjectTemplate ($id: String) {
    mdx(id: {eq: $id}) {
      body
      ...ProjectMdxFrontmatter
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

export default ProjectTemplate