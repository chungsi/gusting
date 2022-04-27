import * as React from 'react'
import { Link } from 'gatsby'

import ProjectExcerpt from './ProjectExcerpt'

import { concat } from '../utils/helpers'

type ProjectPaginationProps = {
  pathPrefix: string
  pathSuffix: string
  next: object
  prev: object
}

/* TODO: Redesign this to be more descriptive */
const ProjectPagination = ({
  pathPrefix,
  pathSuffix,
  next,
  prev
}: ProjectPaginationProps) => {
  return (
    <section className='mb-4xl mt-2xl'>

      {prev &&
        <Link
          to={`/${pathPrefix}/${prev.childMdx.slug}/${pathSuffix ?? ''}`}
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
          to={`/${pathPrefix}/${next.childMdx.slug}/${pathSuffix ?? ''}`}
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