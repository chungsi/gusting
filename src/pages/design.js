import * as React from 'react'
import * as scss from './design.module.scss'
import { graphql } from 'gatsby'
import { getSrcSet } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import Base from '../components/Base'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Logo from '../images/svg/logo.inline.svg'

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
    <Base className={scss.designContainer} customIds='theme-design'>
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
      <header>
        <h1 className='u-margin-none'>{designHome.title}</h1>
        <p className='u-margin-none'>{designHome.subtitle}</p>
      </header>
      <main>
        <section>
          <h2>Featured Projects</h2>
          <div className={scss.projectShelf}>
            {data.featuredProjects.nodes.map(project => (
              <Card
                style={`tilting`}
                key={project.childMdx.id}
                cardId={project.childMdx.slug}
                link={`/project/${project.childMdx.slug}${homeUrlParam}`}
                frontmatter={project.childMdx.frontmatter} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
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