import * as React from 'react'
import * as scss from './card.module.scss'
import { Link } from 'gatsby'

/*
   Note: Instead of having a 'Card' and a 'FloatingCard', could make a flag
   for style in the props => do some processing to output the correct classes
 */
const Card = ({link, title, subtitle, tags, style, className}) => {
  var classList = `${scss.card}`

  switch (String(style)) {
    case 'floating':
      classList = `${classList} ${scss.floatingCard}`
      break
    default:
  }

  if (className) {
    classList = `${classList} ${className}`
  }

  return (
    <article className={classList}>
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
        <h2 className={scss.title}>{title}</h2>
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