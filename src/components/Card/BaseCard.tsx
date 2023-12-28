import * as React from 'react'
import { Link } from 'gatsby'
import ProjectExcerpt from '../ProjectExcerpt'

import { concat } from '../../utils/helpers'

export type BaseCardProps = {
  link: string
  frontmatter: Queries.ProjectMdxFrontmatterFragment['frontmatter']
  accents?: string | JSX.Element
  oneLineTags?: boolean
  id?: string | null | undefined
  className?: string
  children?: React.ReactNode | React.ReactNode[]
}

const BaseCard = ({
  link,
  id,
  className,
  frontmatter,
  accents,
  oneLineTags,
  children,
}: BaseCardProps) => {
  // const { title, subtitle, category, tags } = frontmatter ?? {}

  return (
    <Link
      to={link ?? ''}
      id={id ?? ''}
      className={concat(
        'relative block px-lg py-xl [text-decoration:none] group',
        frontmatter?.category ?? '',
        className ?? '',
      )}
    >

      {accents}
      <ProjectExcerpt frontmatter={frontmatter!} oneLineTags={oneLineTags} />
      {children}

    </Link>
  )
}

export default BaseCard