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

      <div className={scss.hero}>
        <div className={`logo ${scss.heroLogo}`}>
          <Logo />
        </div>
        <div className={scss.heroBg}>
          <picture>
            {heroImagesSrcSet.map(image => (
              <source media={image.media} srcset={image.srcset} />
              ))}
            <img src={heroImagesSrcSet[4].srcset} alt='background of branches' />
          </picture>
        </div>
      </div>


      <section className={scss.designContainer}>

        <header>
          <h1 className='u-margin-none'>{designHome.title}</h1>
          <p className='u-margin-none'>{designHome.subtitle}</p>
        </header>

        <section className='mt-20'>
          <h2 className='sr-only'>Featured Projects</h2>

          <div className={concat(
            'grid grid-cols-2 gap-2xl items-center',
            'lg:grid-cols-3'
          )}>
            {data.featuredProjects.nodes.map(project => (
              // <article
              //   className={`${project.childMdx.frontmatter.category}
              //               relative`}
              //   key={project.childMdx.id} >
              //   <Link
              //     to={`/project/${project.childMdx.slug}${homeUrlParam}`}
              //     className='block px-lg py-xl [text-decoration:none] group' >

              //     <CategoryIcon
              //       category={project.childMdx.frontmatter.category}
              //       className='absolute w-5 -left-1' />

              //     <ProjectExcerpt frontmatter={project.childMdx.frontmatter} />

              //     {project.childMdx.frontmatter.heroImage &&
              //       <img src={getSrc(project.childMdx.frontmatter.heroImage)}
              //         alt=''
              //         className={`project-hero-image
              //                   ${project.childMdx.frontmatter.heroImagePos ?? ''}
              //                   group-hover:translate-x-1 group-hover:-translate-y-1`}
              //         aria-hidden />
              //     }
              //   </Link>
              //   <span className='absolute block top-0 left-0 w-full h-full
              //                    -z-[1] bg-th-bg'></span>
              // </article>
              <TiltingCard
                // style={`tilting`}
                key={project.childMdx.id}
                cardId={project.childMdx.slug}
                link={`/project/${project.childMdx.slug}${homeUrlParam}`}
                frontmatter={project.childMdx.frontmatter} />
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