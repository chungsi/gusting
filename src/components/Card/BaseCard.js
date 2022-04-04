import * as React from 'react'
import { Link } from 'gatsby'
import ProjectExcerpt from '../ProjectExcerpt'
import { concat } from '../../utils/helpers'

const BaseCard = ({
  link,
  cardId,
  className,
  frontmatter: {
    title, subtitle, tags, category, heroImage, heroImagePos
  },
  accents,
  children
}) => {

  return (
    <Link
      to={link}
      className={concat(
        'relative block px-lg py-xl [text-decoration:none] group',
        category,
        className
      )}
    >

      {accents}
      <ProjectExcerpt frontmatter={{ title, subtitle, tags }} />
      {children}

    </Link>
  )
}

export default BaseCard