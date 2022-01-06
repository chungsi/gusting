import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as scss from './art.module.scss'
import Layout from '../components/layout'
import Card from '../components/card'
import Logo from '../images/svg/logo.inline.svg'

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

  return (
    <Layout>
      <section className={scss.featuredGrid}>

        <header className={scss.header}>
          <Link to='/' className='logo'>
            <Logo />
          </Link>
          <div className={scss.titleBlock}>
            <h1 className={scss.siteTitle}>
              {data.site.siteMetadata.title}
            </h1>
            <p className={scss.siteSubtitle}>
              {data.site.siteMetadata.subtitle}
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
      <footer className={scss.footer}>
        <p>made with gatsbyjs</p>
        <p>last updated: december 2021</p>
      </footer>
    </Layout>
  )
}

export const data = graphql`
  query {
    site: site {
      siteMetadata {
        title
        subtitle
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