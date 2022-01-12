import * as React from 'react'
import * as scss from './art.module.scss'
import { graphql, Link } from 'gatsby'
import { getSrcSet } from 'gatsby-plugin-image'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import Base from '../components/base'
import Card from '../components/card'
import Logo from '../images/svg/logo.inline.svg'
import Footer from '../components/footer'

const ArtHomepage = ({data}) => {

  const otherProject = (project, dir) => (
    <section id={project.childMdx.id}>
      <Link
        to={`/${dir}/${project.childMdx.slug}`}
        className={scss.projectLinkContainer}
      >
        <h2>{project.childMdx.frontmatter.title}</h2>
        <p>{project.childMdx.frontmatter.subtitle}</p>
        <ul className={scss.tags}>
          {project.childMdx.frontmatter.tags.map(tag => (
            <li>{tag}</li>
          ))}
        </ul>
      </Link>
    </section>
  )

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
      media: '(min-width: 38.75rem)',
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
    <Base className={scss.artContainer}>
      <div class="hero-bg">
        <picture>
          {heroImagesSrcSet.map(image => (
            <source media={image.media} srcset={image.srcset} />
          ))}
          <img class="bg_img" src={heroImagesSrcSet[0].srcset} alt='background of skypuddle' />
        </picture>
      </div>
      <section className={scss.featuredGrid}>

        <header className={scss.header}>
          <Link to='/' className={`logo ${scss.logo}`}>
            <Logo />
          </Link>
          <div className={scss.titleBlock}>
            <h1 className={scss.siteTitle}>
              {useSiteMetadata().title}
            </h1>
            <p className={scss.siteSubtitle}>
              {useSiteMetadata().subtitle}
            </p>
          </div>
        </header>

        {data.featuredProjects.nodes.map(project =>
          <Card
            key={project.childMdx.id}
            className={scss.projectCard}
            link={`/project/${project.childMdx.slug}`}
            title={project.childMdx.frontmatter.title}
            subtitle={project.childMdx.frontmatter.subtitle}
            tags={project.childMdx.frontmatter.tags}
            style={`floating`} />
        )}
      </section>
      <section className={scss.otherProjects}>
        {
          data.otherProjects.nodes.map(project => otherProject(project, project.sourceInstanceName))
        }
      </section>

      <Footer />
    </Base>
  )
}

export const data = graphql`
  query {
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
        childMdx: {frontmatter: {publish: {eq: true}, feature: {eq: true}}}
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