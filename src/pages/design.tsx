import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { getSrcSet } from 'gatsby-plugin-image'

import Base from '../components/Layout/BaseLayout'
import Footer from '../components/Footer'
import Logo from '../images/svg/logo.inline.svg'
import Seo from '../components/Seo'
import TiltingCard from '../components/Card/TiltingCard'

import { concat, getProjectPath } from '../utils/helpers'
import { DesignHomepageQuery } from '../@types/graphql-generated-types'
import { useSiteMetadata } from '../hooks/useSiteMetadata'


// TODO: consolidate or make common type for art and design homepages
type DesignHomepageProps = {
  // TODO: why can't this one use the "nodes" to get that array?
  // Always throws errors with the returned data being an object and not an array
  heroImages: DesignHomepageQuery["heroImages"]
  featuredProjects: DesignHomepageQuery["featuredProjects"]
  // otherProjects: DesignHomepageQuery["otherProjects"]["nodes"]
}

const DesignHomepage = ({
  data: {
    heroImages,
    featuredProjects
  }
}: PageProps<DesignHomepageProps>) => {

  const designHome = useSiteMetadata()?.designHome
  const designHomeParamName = useSiteMetadata()?.homeUrlParamName
  const designHomeParamValue = designHome?.homeUrlParam
  // const homeUrlParam = `?${useSiteMetadata()?.homeUrlParamName}=${designHome?.homeUrlParam}`

  // console.log('heroImages test: ', heroImages)

  // TODO: some way to use the tailwind config variables in here?
  const heroImagesSrcSet = [
    {
      media: '(min-width: 70rem)',
      srcset: getSrcSet(heroImages?.nodes[0]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 50rem)',
      srcset: getSrcSet(heroImages?.nodes[1]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 44rem)',
      srcset: getSrcSet(heroImages?.nodes[2]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 30rem)',
      srcset: getSrcSet(heroImages?.nodes[3]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 0rem)',
      srcset: getSrcSet(heroImages?.nodes[4]?.childImageSharp?.gatsbyImageData),
    },
  ]

  return (
    <Base id='theme-design'>
      <Seo
        home
        title={designHome?.metaTitle ?? ''}
        slug={location.pathname}
      />

      <div className={concat(
        'relative left-0 top-0 -z-[1]',
        'sm-th:fixed'
      )}>

        <div className={concat(
          'absolute w-11 z-[1] m-[4.5rem_0_0_3rem]',
          'sm-th:m-[3rem_0_0_6rem]',
          'md-th:m-[4.125rem_0_0_9rem]',
          'lg-th:m-[5.125rem_0_0_10.5rem]'
        )}>
          <Logo />
        </div>

        <div className={concat(
          'relative w-[18.75rem]',
          'md-th:w-[21rem] lg-th:w-[24rem]'
        )}>
          <picture>
            {heroImagesSrcSet.map((image, i) => (
              <source media={image.media} srcSet={image.srcset} key={i} />
              ))}
            <img src={heroImagesSrcSet[4].srcset} alt='background of branches' />
          </picture>
        </div>

      </div>


      <section className={concat(
        'max-w-5xl px-lg z-[1]',
        'sm-th:ml-40 sm-th:mt-[3.25rem]',
        'md-th:ml-[12.5rem] md-th:mt-[4.25rem]',
        'lg-th:ml-60 lg-th:mt-[5.25rem]'
      )}>

        <header>
          <h1>{designHome?.title}</h1>
          <p className='italic'>{designHome?.subtitle}</p>
        </header>

        <section className='mt-20'>
          <h2 className='sr-only'>Featured Projects</h2>

          <div className={concat(
            'grid grid-cols-1 gap-2xl items-center',
            'sm:grid-cols-2',
            'lg:grid-cols-3'
          )}>
            {featuredProjects?.nodes.map((project, i) => (
              <TiltingCard
                key={i}
                id={project?.childMdx?.slug}
                link={getProjectPath(
                  project?.childMdx?.slug ?? '',
                  [{name: designHomeParamName ?? '', value: designHomeParamValue ?? ''}]
                )}
                frontmatter={project?.childMdx?.frontmatter}
              />
            ))}
          </div>
        </section>

        <Footer />

      </section>
    </Base>
  )
}

export const data = graphql`
  query DesignHomepage {
    heroImages: allFile(
      filter: {sourceInstanceName: {eq: "assets"}, name: {regex: "/branch/"}}
      sort: {fields: name, order: DESC}
    ) {
      nodes {
        id
        name
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    featuredProjects: allFile(
      filter: {
        sourceInstanceName: {eq: "project"},
        extension: {eq: "mdx"},
        name: {regex: "/^[^_]/"},
        childMdx: {frontmatter: {publish: {eq: true}, feature: {eq: true}}}
      }
      sort: {fields: childMdx___frontmatter___date, order: ASC}
    ) {
      nodes {
        sourceInstanceName
        childMdx {
          id
          slug
          ...ProjectMdxFrontmatter
        }
      }
    }
  }
`

export default DesignHomepage