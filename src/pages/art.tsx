import * as React from 'react'
import * as scss from './art.module.css'
import { graphql, Link } from 'gatsby'
import { getSrcSet } from 'gatsby-plugin-image'

import Base from '../components/Layout/BaseLayout'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import FloatingCard from '../components/Card/FloatingCard'

import { concat } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import BaseCard from '../components/Card/BaseCard'

const ArtHomepage = ({data}) => {

  const artHome = useSiteMetadata().artHome
  const homeUrlParam = `?${useSiteMetadata().homeUrlParamName}=${artHome.homeUrlParam}`

  const heroImagesSrcSet = [
    {
      media: '(min-width: 96rem)',
      srcset: getSrcSet(data.heroImages.nodes[0]),
    },
    {
      media: '(min-width: 50rem)',
      srcset: getSrcSet(data.heroImages.nodes[1]),
    },
    {
      media: '(min-width: 39rem)',
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
    <Base
      id='theme-art'
      className={concat(
        'max-w-xl mt-[24%] ml-[2rem] mr-md',
        '2xs-th:ml-[20%]',
        'xs-th:mr-2xl xs-th:ml-[20%]',
        'md-th:mt-[16%] md-th:ml-[48%] md-th:mr-xl ',
        'lg-th:ml-[52%]',
        'xl-th:ml-[60%]',
        '2xl-th:mt-[12%] 2xl-th:ml-[52%]'
      )}
    >
      <div className={concat(
        'fixed top-0 left-0 h-auto w-full -z-[1]',
        '2xl-th:w-[86vw]'
      )}>
        <picture>
          {heroImagesSrcSet.map((image, i) => (
            <source media={image.media} srcSet={image.srcset} key={i} />
          ))}
          <img src={heroImagesSrcSet[0].srcset} alt='background of skypuddle' />
        </picture>
      </div>

      <header className='md-th:flex'>
        <Logo className={concat(
          'w-12 mb-xl mr-sm',
          'md-th:-mt-2xs'
        )}/>
        <div>
          <h1 className='tracking-widest'>{artHome.title}</h1>
          <p className='font-light'>{artHome.subtitle}</p>
        </div>
      </header>

      <h2 className='sr-only'>Projects</h2>

      <section className={scss.featuredGrid}>
        {data.featuredProjects.nodes.map((project, i) => (
          <FloatingCard
            key={i}
            className={scss.projectCard}
            cardId={project.childMdx.slug}
            link={`/project/${project.childMdx.slug}${homeUrlParam}`}
            frontmatter={project.childMdx.frontmatter}
          />
        ))}
      </section>

      <section className='grid'>
        <h2 className='sr-only'>Other Projects</h2>

        {data.otherProjects.nodes.map((project, i) =>
          <BaseCard
            key={i}
            link={`/project/${project.childMdx.slug}`}
            frontmatter={project.childMdx.frontmatter}
          />
        )}

      </section>

      <Footer />
    </Base>
  )
}

export const data = graphql`
  query ArtHomepageQuery {
    heroImages: allFile(
      filter: {sourceInstanceName: {eq: "assets"}, name: {regex: "/skypuddle/"}}
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
        childMdx: {frontmatter: {
          publish: {eq: true},
          feature: {eq: true},
          category: {in: ["art", "storytelling"]}
        }}
      }
      sort: {fields: childMdx___frontmatter___date, order: DESC}
    ) {
      nodes {
        childMdx {
          id
          slug
          ...ProjectMdxFrontmatterFragment
        }
        sourceInstanceName
      }
    }
    otherProjects: allFile(
      filter: {
        sourceInstanceName: {eq: "project"},
        extension: {eq: "mdx"},
        childMdx: {frontmatter: {publish: {ne: true}, feature: {ne: true}}}
      }
      sort: {fields: childMdx___frontmatter___date, order: DESC}
    ) {
      nodes {
        childMdx {
          frontmatter {
            title
            subtitle
            category
            tags
          }
          id
          slug
        }
        sourceInstanceName
      }
    }
  }
`

export default ArtHomepage