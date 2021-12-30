import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as scss from './art.module.scss'
import Layout from '../components/layout'
import Card from '../components/card'

const ArtHomepage = ({data}) => {

  const otherProject = (project, dir) => (
    <section id={project.childMdx.id}>
      <Link
        to={`/${dir}/${project.childMdx.slug}`}
        className={scss.projectLinkContainer}
      >
        <h2>{project.childMdx.frontmatter.title}</h2>
        <p>{project.childMdx.frontmatter.date}</p>
      </Link>
    </section>
  )

  return (
    <Layout>
      <section className={scss.featuredProjects}>
        {data.projects.nodes.map(project =>
          <Card
            key={project.childMdx.id}
            link={`/project/${project.childMdx.slug}`}
            title={project.childMdx.frontmatter.title}
            subtitle={project.childMdx.frontmatter.subtitle}
            tags={project.childMdx.frontmatter.tags}
            style={`floating`} />
        )}
      </section>
      <section className={scss.otherProjects}>
        {
          data.blog.nodes.map(project => otherProject(project, project.sourceInstanceName))
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
    projects: allFile(
      filter: {sourceInstanceName: {eq: "project"}, extension: {eq: "mdx"}}
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
    blog: allFile(
      filter: {sourceInstanceName: {eq: "blog"}, extension: {eq: "mdx"}}
      sort: {fields: childMdx___frontmatter___date, order: DESC}
    ) {
      nodes {
        childMdx {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
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