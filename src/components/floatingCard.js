import { Link } from 'gatsby'
import * as React from 'react'
import * as scss from './floatingCard.module.scss'

const FloatingProjectCard = ({data}) => {
  return (
    <article>
      <Link to="/">
        <h2>title</h2>
        <p>subtitle</p>
        <ul>
          <li>tag list</li>
        </ul>
      </Link>
    </article>
  )
}

export default FloatingCard