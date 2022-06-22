import * as React from 'react'
import { Link } from 'gatsby'

import ProjectExcerpt from './ProjectExcerpt'

import { concat } from '../utils/helpers'

type ProjectPaginationProps = {
  pathPrefix?: string
  pathSuffix?: string
  next?: Queries.Mdx
  prev?: Queries.Mdx
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
          to={`/${pathPrefix}/${prev?.slug}/${pathSuffix ?? ''}`}
          className='block text-right group'
        >
          {prev?.frontmatter?.title}
          {/* <ProjectExcerpt frontmatter={prev?.frontmatter} /> */}

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
          to={`/${pathPrefix}/${next?.slug}/${pathSuffix ?? ''}`}
          className='block group'
        >
          <span
            aria-hidden
            className='inline-block mr-xs transition-transform group-hover:-translate-x-1'
          >
            «
          </span>

          {next?.frontmatter?.title}
          {/* <ProjectExcerpt frontmatter={next.childMdx.frontmatter} /> */}
        </Link>
      }

    </section>
  )
}

export default ProjectPagination