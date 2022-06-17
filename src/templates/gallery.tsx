import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import ContentLayout from '../components/Layout/ContentLayout'
import ProjectHeader from '../components/ProjectHeader'
import MdxImage from '../components/Mdx/MdxImage'
import MdxGalleryImage from '../components/Mdx/MdxGalleryImage'
import MdxGrid from '../components/Mdx/MdxGrid'
import Seo from '../components/Seo'

import { concat, getGalleryImagesArrayForMdx, getHomeUrlParam, getHomeTitle } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import type { GalleryTemplateQuery } from '../@types/graphql-generated-types'


// TODO: 
type GalleryTemplateProps = {
  mdx: GalleryTemplateQuery["mdx"]
  location?: PageProps["location"]
}

const GalleryTemplate = ({ data: {mdx}, location }: PageProps<GalleryTemplateProps>) => {

  // Get the param for which homepage the user navigated to ths page from;
  // The query param is set on the individual homepages
  const paramKeyForHome = useSiteMetadata()?.homeUrlParamName ?? ''
  const homeSlug = getHomeUrlParam(location, paramKeyForHome)

  // Parsing the gallery images into an object of (GatsbyImage components)
  // so they can be accessed in the MDX file
  var galleryImages = getGalleryImagesArrayForMdx(mdx?.frontmatter)

  return (
    <ContentLayout
      homeUrl={homeSlug}
      header={
        <ProjectHeader
          withHeroImage
          frontmatter={mdx?.frontmatter!}
          className='mb-md'
        />
      }
      bodyClassName={mdx?.frontmatter?.category ?? ''}
      className='max-w-7xl'
    >

      {/* TODO: maybe move this to content layout and just pass in a data object? */}
      <Seo
        title={mdx?.frontmatter?.title}
        description={mdx?.frontmatter?.description}
        homeTitle={getHomeTitle(homeSlug)}
        slug={location.pathname + location.search}
        image={mdx?.frontmatter?.metaImage?.publicURL}
      />

      <section className='prose'>
        <MDXProvider components={{MdxImage, MdxGalleryImage, MdxGrid}}>
          <MDXRenderer gallery={galleryImages}>
            {mdx?.body ?? ''}
          </MDXRenderer>
        </MDXProvider>
      </section>

    </ContentLayout>
  )
}


export const query = graphql`
  query GalleryTemplate ($id: String) {
    mdx(id: {eq: $id}) {
      body
      tableOfContents
      ...ProjectMdxFrontmatter
      ...ProjectMdxFrontmatterGallery
    }
  }
`

export default GalleryTemplate