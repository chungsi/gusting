import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { getSrc, IGatsbyImageData } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import ContentLayout from '../components/Layout/ContentLayout'
import ProjectHeader from '../components/ProjectHeader'
// import ProjectPagination from '../components/ProjectPagination'
import MdxImage from '../components/Mdx/MdxImage'
import MdxGalleryImage from '../components/Mdx/MdxGalleryImage'
import MdxGrid from '../components/Mdx/MdxGrid'
import ProjectToc, { TableOfContents } from '../components/ProjectToc'
import Seo from '../components/Seo'

import * as styles from './project.module.css'
import { concat, getGalleryImagesArrayForMdx, getHomeUrlParam, getHomeTitle } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'


// TODO: Remove PageContext if I'm not using it; otherwise need to fix it
type ProjectTemplateProps = {
  mdx: Queries.ProjectTemplateQuery["mdx"]
  location?: PageProps["location"]
  pageContext?: PageProps["pageContext"]
}

const ProjectTemplate = ({ data: {mdx}, location, pageContext }: PageProps<ProjectTemplateProps>) => {

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
      // header={<ProjectHeader frontmatter={mdx?.frontmatter!} className='mb-md' />}
      bodyClassName={mdx?.frontmatter?.category ?? ''}
      className={concat(
        styles.projectGrid,
        'max-w-[100rem]',
        'relative',
      )}
    >

      {/* TODO: maybe move this to content layout and just pass in a data object? */}
      <Seo
        title={mdx?.frontmatter?.title}
        description={mdx?.frontmatter?.description}
        homeTitle={getHomeTitle(homeSlug)}
        slug={location.pathname + location.search}
        image={mdx?.frontmatter?.metaImage?.publicURL}
      />

      {/* <section className={concat(
        styles.projectGrid,
        'relative',
        // 'grid gap-8 lg:[grid-template-columns:5fr_2fr]'
      )}> */}

        <div className={concat(
          styles.projectHero,
          'relative'
        )}>
          {mdx?.frontmatter?.heroImage &&
            <img
              aria-hidden
              src={getSrc(mdx.frontmatter.heroImage?.childImageSharp?.gatsbyImageData!)}
              alt=''
              className={concat(
                'absolute right-0 top-[-1rem] opacity-70 ',
                'block max-w-[7rem]',
                'md:max-w-[9rem]',
                'lg:fixed lg:right-auto lg:top-auto'
              )}
            />
          }
        </div>


        <ProjectHeader
          frontmatter={mdx?.frontmatter!}
          className={concat(
            styles.projectHead,
            'mb-md',
          )}
        />


        <div className={`${styles.projectToc}`}>
          <ProjectToc
            content={mdx?.tableOfContents?.items as TableOfContents[]}
            maxDepth={2}
            className={`lg:fixed`}
          />
        </div>


        <section className={concat(
          'prose',
          styles.projectBody
        )}>
          <MDXProvider components={{MdxImage, MdxGalleryImage, MdxGrid}}>
            <MDXRenderer gallery={galleryImages}>
              {mdx?.body ?? ''}
            </MDXRenderer>
          </MDXProvider>
        </section>

      {/* </section> */}

      {/* <ProjectPagination
        pathPrefix='project'
        pathSuffix={`?${paramKey}=${homeSlug}`}
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
      tableOfContents
      ...ProjectMdxFrontmatter
      ...ProjectMdxFrontmatterGallery
    }
  }
`

export default ProjectTemplate