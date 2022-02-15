import * as React from 'react'
import * as scss from './Card.module.scss'
import { Link } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import ProjectExcerpt from './ProjectExcerpt'
import CategoryIcon from './CategoryIcon'
import ShapeSvg from './ShapeSvg'

/*
   Note: Instead of having a 'Card' and a 'FloatingCard', could make a flag
   for style in the props => do some processing to output the correct classes
 */
const Card = ({
  link,
  style,
  cardId,
  className,
  frontmatter: {
    title, subtitle, tags, category, heroImage, heroImagePos
  }}) => {
  var hasCategoryIcon = category ? true : false
  var hasHeroImage = heroImage != null ? true : false
  var hasShapeBg = false

  var classList = `${category ?? ''} ${className ?? ''}`;
  switch (String(style)) {
    case 'floating':
      classList = `${classList} ${scss.floatingCard}`
      hasCategoryIcon = false
      break
    case 'tilting':
      classList = `${classList} ${scss.tiltingCard}`
      break
    case 'shapes':
      hasShapeBg = true
      break
    default:
  }

  // if (className) {
  //   classList = `${classList} ${className}`
  // }

  return (
    <article
      className={`relative ${classList}`}
      id={cardId ?? cardId} >
      <Link
        to={link}
        className='block px-lg py-xl [text-decoration:none] group' >

        {hasCategoryIcon &&
          <CategoryIcon
            category={category}
            className='absolute w-5 left-[-.25rem]' />
        }
        {hasShapeBg && <ShapeSvg category={category} />}

        <ProjectExcerpt frontmatter={this.frontmatter} />

        {hasHeroImage &&
          <img src={getSrc(heroImage)}
          alt=''
          className={`${scss.heroImage} ${heroImagePos ? scss[heroImagePos] : ''}
                    group-hover:translate-x-1 group-hover:translate-y-[-.25rem]`}
          aria-hidden />
        }
      </Link>
    </article>
  )
}

export default Card