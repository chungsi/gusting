import * as React from 'react'
import { Link } from 'gatsby'

import { concat } from '../utils/helpers'
import ProjectExcerpt from './ProjectExcerpt'

const ProjectPagination = ({ pathPrefix, next, prev }) => {
  return (
    <section className='mb-4xl mt-2xl'>

      {prev &&
        <Link
          to={`/${pathPrefix}/${prev.childMdx.slug}`}
          className='block text-right group'
        >
          {prev.childMdx.frontmatter.title}
          {/* <ProjectExcerpt frontmatter={prev.childMdx.frontmatter} /> */}

          <span
            aria-hidden
            className='inline-block ml-xs transition-transform group-hover:translate-x-1'
          >
            »
          </span>
        </Link>
      }

      {next &&
        <Link
          to={`/${pathPrefix}/${next.childMdx.slug}`}
          className='block group'
        >
          <span
            aria-hidden
            className='inline-block mr-xs transition-transform group-hover:-translate-x-1'
          >
            «
          </span>

          {next.childMdx.frontmatter.title}
          {/* <ProjectExcerpt frontmatter={next.childMdx.frontmatter} /> */}
        </Link>
      }

    </section>
  )
}

export default ProjectPagination