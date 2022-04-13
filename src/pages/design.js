import * as React from 'react'
import * as scss from './design.module.scss'
import { graphql } from 'gatsby'
import { getSrcSet } from 'gatsby-plugin-image'

import Base from '../components/Base'
import Footer from '../components/Footer'
import Logo from '../images/svg/logo.inline.svg'
import TiltingCard from '../components/Card/TiltingCard'

import { concat } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const DesignHomepage = ({ data}) => {

  const designHome = useSiteMetadata().designHome
  const homeUrlParam = `?${useSiteMetadata().homeUrlParamName}=design`

  // TODO: some way to use the tailwind config variables in here?
  const heroImagesSrcSet = [
    {
      media: '(min-width: 69.75rem)',
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
    <Base customIds='theme-design'>

      <div className={concat(
        'relative left-0 top-0 -z-[1]',
        'th-md:fixed'
      )}>

        <div className={concat(
          'absolute w-11 z-[1] m-[4.5rem_0_0_3rem]',
          'th-md:m-[3rem_0_0_6rem] th-lg:m-[4.125rem_0_0_9rem] th-xl:m-[5.125rem_0_0_10.5rem]'
        )}>
          <Logo />
        </div>

        <div className={concat(
          'relative w-[18.75rem]',
          'th-lg:w-[21rem] th-xl:w-[24rem]'
        )}>
          <picture>
            {heroImagesSrcSet.map(image => (
              <source media={image.media} srcset={image.srcset} />
              ))}
            <img src={heroImagesSrcSet[4].srcset} alt='background of branches' />
          </picture>
        </div>

      </div>


      <section className={concat(
        'max-w-5xl px-lg z-[1]',
        'th-md:ml-40 th-md:mt-[3.25rem]',
        'th-lg:ml-[12.5rem] th-lg:mt-[4.25rem]',
        'th-xl:ml-60 th-xl:mt-[5.25rem]'
      )}>

        <header>
          <h1>{designHome.title}</h1>
          <p>{designHome.subtitle}</p>
        </header>

        <section className='mt-20'>
          <h2 className='sr-only'>Featured Projects</h2>

          <div className={concat(
            'grid grid-cols-1 gap-2xl items-center',
            'sm:grid-cols-2',
            'lg:grid-cols-3'
          )}>
            {data.featuredProjects.nodes.map(project => (
              <TiltingCard
                key={project.childMdx.id}
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
      sort: {fields: childMdx___frontmatter___date, order: DESC}
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