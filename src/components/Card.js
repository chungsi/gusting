import * as React from 'react'
import * as scss from './Card.module.scss'
import { Link } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
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
  var classList = `${scss.card} ${category ?? ''}`
  var hasCategoryIcon = category ? true : false
  var hasHeroImage = heroImage != null ? true : false
  var hasShapeBg = false

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

  if (className) {
    classList = `${classList} ${className}`
  }

  return (
    <article className={classList} id={cardId ?? cardId}>
      <Link
        to={link}
        className={scss.linkContainer} >

        {hasCategoryIcon &&
          <CategoryIcon
            category={category}
            className='absolute w-5 left-[-.25rem]' />
        }
        {hasShapeBg && <ShapeSvg category={category} />}
        {/*
          These slots ( {title}, {subtitle} ) can be passed a JSX object,
          so could come without the wrapping tags which lets individual
          calls to define their own HTML tags and classes...
          Would that be useful for me at this point?
         */}
        <h3 className={scss.title}>{title}</h3>
        <p className={scss.subtitle}>{subtitle}</p>
        {tags &&
          <ul className={scss.tags}>
            {tags.map(tag => (
              <li>{tag}</li>
            ))}
          </ul>
        }
      </Link>
      {hasHeroImage &&
        <img src={getSrc(heroImage)}
          alt=''
          className={`${scss.heroImage} ${heroImagePos ? scss[heroImagePos] : ''}`}
          aria-hidden />
      }
    </article>
  )
}

export default Card