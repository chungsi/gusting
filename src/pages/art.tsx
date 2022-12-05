import * as React from 'react'
import * as scss from './art.module.css'
import { graphql, PageProps } from 'gatsby'
import { getSrcSet } from 'gatsby-plugin-image'

import Base from '../components/Layout/BaseLayout'
import BaseCard from '../components/Card/BaseCard'
import FloatingCard from '../components/Card/FloatingCard'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import OgImageArt from '../images/ogImage_square_art.jpg'
import Seo from '../components/Seo'

import { concat, getProjectPath } from '../utils/helpers'
import { useSiteMetadata } from '../hooks/useSiteMetadata'


type ArtHomepageProps = {
  heroImages: Queries.ArtHomepageQuery["heroImages"]
  featuredProjects: Queries.ArtHomepageQuery["featuredProjects"]
  otherProjects: Queries.ArtHomepageQuery["otherProjects"]
  location: PageProps["location"]
}

const ArtHomepage = ({
  data: {
    heroImages,
    featuredProjects,
    otherProjects,
  },
  location
}: PageProps<ArtHomepageProps>) => {

  const artHome = useSiteMetadata()?.artHome
  const artHomeParamName = useSiteMetadata()?.homeUrlParamName
  const artHomeParamValue = artHome?.homeUrlParam

  const heroImagesSrcSet = [
    {
      media: '(min-width: 96rem)',
      srcset: getSrcSet(heroImages?.nodes[0]?.childImageSharp?.gatsbyImageData!),
    },
    {
      media: '(min-width: 50rem)',
      srcset: getSrcSet(heroImages?.nodes[1]?.childImageSharp?.gatsbyImageData!),
    },
    {
      media: '(min-width: 39rem)',
      srcset: getSrcSet(heroImages?.nodes[2]?.childImageSharp?.gatsbyImageData!),
    },
    {
      media: '(min-width: 30rem)',
      srcset: getSrcSet(heroImages?.nodes[3]?.childImageSharp?.gatsbyImageData!),
    },
    {
      media: '(min-width: 0rem)',
      srcset: getSrcSet(heroImages?.nodes[4]?.childImageSharp?.gatsbyImageData!),
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
      <Seo
        home
        title={artHome?.metaTitle ?? ''}
        slug={location.pathname}
        image={OgImageArt}
      />

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
        {featuredProjects?.nodes.map((project, i) => (
          <FloatingCard
            key={i}
            className={scss.projectCard}
            id={project?.childMdx?.fields?.slug}
            link={getProjectPath(
              project?.childMdx?.fields?.slug ?? '',
              [{name: artHomeParamName ?? '', value: artHomeParamValue ?? ''}]
            )}
            frontmatter={project?.childMdx?.frontmatter!}
          />
        ))}
      </section>

      <section className='grid'>
        <h2 className='sr-only'>Other Projects</h2>

        {otherProjects?.nodes.map((project, i) =>
          <BaseCard
            key={i}
            link={`/project/${project?.childMdx?.fields?.slug}`}
            frontmatter={project?.childMdx?.frontmatter!}
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
      sort: {name: DESC}
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
      # sort: { childMdx: { frontmatter: { date: DESC } }}
    ) {
      nodes {
        childMdx {
          id
          fields { slug }
          ...ProjectMdxFrontmatter
        }
        sourceInstanceName
      }
    }
    otherProjects: allFile(
      filter: {
        sourceInstanceName: {eq: "project"},
        extension: {eq: "mdx"},
        childMdx: {frontmatter: {
          publish: {eq: true},
          feature: {ne: true}
        }}
      }
      # sort: { childMdx: { frontmatter: { date: DESC } }}
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
          fields { slug }
        }
        sourceInstanceName
      }
    }
  }
`

export default ArtHomepage