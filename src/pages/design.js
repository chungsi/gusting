import * as React from 'react'
import { graphql } from 'gatsby'
import { getSrcSet } from 'gatsby-plugin-image'

import Base from '../components/Layout/BaseLayout'
import Footer from '../components/Footer'
import Logo from '../images/svg/logo.inline.svg'
import TiltingCard from '../components/Card/TiltingCard'

import { concat } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const DesignHomepage = ({ data}) => {

  const designHome = useSiteMetadata().designHome
  const homeUrlParam = `?${useSiteMetadata().homeUrlParamName}=${designHome.homeUrlParam}`

  // TODO: some way to use the tailwind config variables in here?
  const heroImagesSrcSet = [
    {
      media: '(min-width: 70rem)',
      srcset: getSrcSet(data.heroImages.nodes[0]),
    },
    {
      media: '(min-width: 50rem)',
      srcset: getSrcSet(data.heroImages.nodes[1]),
    },
    {
      media: '(min-width: 44rem)',
      srcset: getSrcSet(data.heroImages.nodes[2]),
    },
    {
      media: '(min-width: 30rem)',
      srcset: getSrcSet(data.heroImages.nodes[3]),
    },
    {
      media: '(min-width: 0rem)',
      srcset: getSrcSet(data.heroImages.nodes[4]),
    },
  ]

  return (
    <Base id='theme-design'>

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
          <h1>{designHome.title}</h1>
          <p className='italic'>{designHome.subtitle}</p>
        </header>

        <section className='mt-20'>
          <h2 className='sr-only'>Featured Projects</h2>

          <div className={concat(
            'grid grid-cols-1 gap-2xl items-center',
            'sm:grid-cols-2',
            'lg:grid-cols-3'
          )}>
            {data.featuredProjects.nodes.map((project, i) => (
              <TiltingCard
                key={i}
                cardId={project.childMdx.slug}
                link={`/project/${project.childMdx.slug}${homeUrlParam}`}
                frontmatter={project.childMdx.frontmatter}
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
  query {
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
          ...ProjectMdxFrontmatterFragment
        }
      }
    }
  }
`

export default DesignHomepage