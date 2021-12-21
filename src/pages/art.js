import * as React from 'react'
import { graphql, Link } from 'gatsby'
// import * as scss from './art.module.scss'
// import Layout from '../components/layout'
import ArtLayout from '../components/artLayout'

const ArtHomepage = ({data}) => {

  // const featuredProject = (project) => (
  //   <section id={project.childMdx.id} className={scss.project}>
  //     <Link
  //       to={`/project/${project.childMdx.slug}`}
  //       className={scss.projectLinkContainer}
  //     >
  //       <h2 className={scss.projectTitle}>
  //         {project.childMdx.frontmatter.title}
  //       </h2>
  //       <p className={scss.projectSubtitle}>
  //         {project.childMdx.frontmatter.subtitle}
  //       </p>
  //       <ul className={scss.projectCategories}>
  //         {project.childMdx.frontmatter.category.map(item => (
  //           <li>{item} /</li>
  //         ))}
  //       </ul>
  //     </Link>
  //   </section>
  // )

  // const otherProject = (post) => (
  //   <section id={post.childMdx.id}>
  //     <Link
  //       to={`/blog/${post.childMdx.slug}`}
  //       className={scss.projectLinkContainer}
  //     >
  //       <h2>{post.childMdx.frontmatter.title}</h2>
  //       <p>{post.childMdx.frontmatter.date}</p>
  //     </Link>
  //   </section>
  // )

  return (
    <ArtLayout
      featuredProjects={data.projects.nodes}
      otherProjects={data.blog.nodes}
      />
    // <Layout>
    //   <section className={scss.featuredProjects}>
    //     {
    //       data.projects.nodes.map(project => featuredProject(project))
    //     }
    //   </section>
    //   <section className={scss.otherProjects}>
    //     {
    //       data.blog.nodes.map(post => otherProject(post))
    //     }
    //   </section>
    //   <footer className={scss.footer}>
    //     <p>made with gatsbyjs</p>
    //     <p>last updated: december 2021</p>
    //   </footer>
    // </Layout>
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