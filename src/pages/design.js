import * as React from 'react'
import * as scss from './design.module.scss'
import { Link, graphql } from 'gatsby'
import { getSrcSet, getSrc } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import Base from '../components/base'
import Card from '../components/card'
import Footer from '../components/footer'
import Logo from '../images/svg/logo.inline.svg'

const DesignHomepage = ({data}) => {

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
        <Link to='/' className={`logo ${scss.heroLogo}`}>
          <Logo />
        </Link>
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
        <h1>{useSiteMetadata().title}</h1>
        <p>{useSiteMetadata().subtitle}</p>
      </header>
      <main>
        <section>
          <h2>Projects</h2>
          <div class={scss.projectShelf}>
            {data.featuredProjects.nodes.map(project => (
              <Card
                key={project.childMdx.id}
                category={project.childMdx.frontmatter.category}
                // className={project.childMdx.frontmatter.category}
                link={`/project/${project.childMdx.slug}`}
                title={project.childMdx.frontmatter.title}
                subtitle={project.childMdx.frontmatter.subtitle}
                tags={project.childMdx.frontmatter.tags}
                heroImageSrc={getSrc(project.childMdx.frontmatter.hero_image)}
                heroImagePos={project.childMdx.frontmatter.hero_image_pos}
                style={`tilting`}
                cardId={project.childMdx.slug} />
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
          frontmatter {
            title
            subtitle
            category
            tags
            hero_image_pos
            hero_image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

export default DesignHomepage