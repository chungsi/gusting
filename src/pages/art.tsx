import * as React from 'react'
import * as scss from './art.module.css'
import { graphql, Link, PageProps } from 'gatsby'
import { getSrcSet, IGatsbyImageData } from 'gatsby-plugin-image'

import Base from '../components/Layout/BaseLayout'
import BaseCard from '../components/Card/BaseCard'
import FloatingCard from '../components/Card/FloatingCard'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

import { ArtHomepageQuery } from '../@types/graphql-generated-types'
import { concat } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'


type ArtHomepageProps = {
  heroImages: ArtHomepageQuery["heroImages"]["nodes"]
  featuredProjects: ArtHomepageQuery["featuredProjects"]["nodes"]
  otherProjects: ArtHomepageQuery["otherProjects"]["nodes"]
}

const ArtHomepage = ({
  data: {
    heroImages,
    featuredProjects,
    otherProjects,
  }
}: PageProps<ArtHomepageProps>) => {

  const artHome = useSiteMetadata()?.artHome
  const homeUrlParam = `?${useSiteMetadata()?.homeUrlParamName}=${artHome?.homeUrlParam}`

  const heroImagesSrcSet = [
    {
      media: '(min-width: 96rem)',
      srcset: getSrcSet(heroImages[0]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 50rem)',
      srcset: getSrcSet(heroImages[1]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 39rem)',
      srcset: getSrcSet(heroImages[2]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 30rem)',
      srcset: getSrcSet(heroImages[3]?.childImageSharp?.gatsbyImageData),
    },
    {
      media: '(min-width: 0rem)',
      srcset: getSrcSet(heroImages[4]?.childImageSharp?.gatsbyImageData),
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
          <h1 className='tracking-widest'>{artHome?.title}</h1>
          <p className='font-light'>{artHome?.subtitle}</p>
        </div>
      </header>

      <h2 className='sr-only'>Projects</h2>

      <section className={scss.featuredGrid}>
        {featuredProjects.map((project, i) => (
          <FloatingCard
            key={i}
            className={scss.projectCard}
            id={project?.childMdx?.slug}
            link={`/project/${project?.childMdx?.slug}${homeUrlParam}`}
            frontmatter={project?.childMdx?.frontmatter}
          />
        ))}
      </section>

      <section className='grid'>
        <h2 className='sr-only'>Other Projects</h2>

        {otherProjects.map((project, i) =>
          <BaseCard
            key={i}
            link={`/project/${project?.childMdx?.slug}`}
            frontmatter={project?.childMdx?.frontmatter}
          />
        )}

      </section>

      <Footer />
    </Base>
  )
}

export const data = graphql`
  query ArtHomepage {
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
          ...ProjectMdxFrontmatter
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