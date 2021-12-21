import * as React from 'react'
import * as scss from './card.module.scss'
import { Link } from 'gatsby'

const Card = ({link, title, subtitle, tags}) => {
  return (
    <article className={scss.card}>
      <Link
        to={link}
        className={scss.linkContainer}
      >
        <h2>{title}</h2>
        <p>{subtitle}</p>
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