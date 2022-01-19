import * as React from 'react'
import * as scss from './card.module.scss'
import { Link } from 'gatsby'
import CategoryIcon from './categoryIcon'

/*
   Note: Instead of having a 'Card' and a 'FloatingCard', could make a flag
   for style in the props => do some processing to output the correct classes
 */
const Card = ({link, title, subtitle, tags, category, style, className, cardId}) => {
  var classList = `${scss.card} ${category && category}`
  var hasCategoryIcon = true

  switch (String(style)) {
    case 'floating':
      classList = `${classList} ${scss.floatingCard}`
      hasCategoryIcon = false
      break
    case 'tilting':
      classList = `${classList} ${scss.tiltingCard}`
      break
    default:
  }

  if (className) {
    classList = `${classList} ${className}`
  }

  return (
    <article className={classList} id={cardId ?? cardId}>
      {hasCategoryIcon && <CategoryIcon category={category} />}
      <Link
        to={link}
        className={scss.linkContainer}
      >
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
    </article>
  )
}

export default Card