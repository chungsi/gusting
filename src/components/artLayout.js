import * as React from 'react'
import '../scss/global.scss'
import Layout from '../components/layout'
import Card from '../components/card'
import * as scss from './artLayout.module.scss'
import { Link } from 'gatsby'

const ArtLayout = ({ featuredProjects, otherProjects }) => {
  // const featuredProject = (project, dir) => (
  //   <section id={project.childMdx.id} className={scss.project}>
  //     <Link
  //       to={`/${dir}/${project.childMdx.slug}`}
  //       className={scss.projectLinkContainer}
  //     >
  //       <h2 className={scss.projectTitle}>
  //         {project.childMdx.frontmatter.title}
  //       </h2>
  //       <p className={scss.projectSubtitle}>
  //         {project.childMdx.frontmatter.subtitle}
  //       </p>
  //       <ul className={scss.projectCategories}>
  //         {project.childMdx.frontmatter.tags.map(item => (
  //           <li>{item} /</li>
  //         ))}
  //       </ul>
  //     </Link>
  //   </section>
  // )

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
        {featuredProjects.map(project =>
          <Card
            key={project.childMdx.id}
            link={`/project/${project.childMdx.slug}`}
            title={project.childMdx.frontmatter.title}
            subtitle={project.childMdx.frontmatter.subtitle}
            tags={project.childMdx.frontmatter.tags} />
        )}
      </section>
      <section className={scss.otherProjects}>
        {
          otherProjects.map(project => otherProject(project, project.sourceInstanceName))
        }
      </section>
      <footer className={scss.footer}>
        <p>made with gatsbyjs</p>
        <p>last updated: december 2021</p>
      </footer>
    </Layout>
  )
}

export default ArtLayout