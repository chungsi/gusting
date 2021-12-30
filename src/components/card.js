import * as React from 'react'
import * as scss from './card.module.scss'
import { Link } from 'gatsby'

/*
   Note: Instead of having a 'Card' and a 'FloatingCard', could make a flag
   for style in the props => do some processing to output the correct classes
 */
const Card = ({link, title, subtitle, tags, style}) => {
  var classList = `${scss.card}`

  switch (style) {
    case 'floating':
      classList= `${classList} ${scss.floatingCard}`
      break
    default:
  }

  return (
    <article className={classList}>
      <Link
        to={link}
        className={scss.linkContainer}
      >
        <h2 className={scss.title}>{title}</h2>
        <p className={scss.subtitle}>{subtitle}</p>
        <ul className={scss.tags}>
          {tags.map(tag => (
            <li>{tag}</li>
          ))}
        </ul>
      </Link>
    </article>
  )
}

export default Card