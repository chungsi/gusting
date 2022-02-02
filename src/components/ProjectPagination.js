import * as React from 'react'
import * as scss from './ProjectPagination.module.scss'
import { Link } from 'gatsby'

const ProjectPagination = ({pathPrefix, next, prev}) => {
  return (
    <section className={scss.container}>
      {prev &&
        <Link
          to={`/${pathPrefix}/${prev.childMdx.slug}`}
          className={scss.prev}
        >
          {prev.childMdx.frontmatter.title}
        </Link>
      }
      {next &&
        <Link
          to={`/${pathPrefix}/${next.childMdx.slug}`}
          className={scss.next}
        >
          {next.childMdx.frontmatter.title}
        </Link>
      }
    </section>
  )
}

export default ProjectPagination