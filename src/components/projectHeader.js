import * as React from 'react'
import * as scss from './projectHeader.module.scss'

const ProjectHeader = ({ title, subtitle, category }) => {
  return (
    <header>
      <h1 className={`${scss.title} ${category}`}>
        {title}
        <span className={scss.category}>
          &#123;{category}&#125;
        </span>
      </h1>
      <p className={scss.subtitle}>{subtitle}</p>
    </header>
  )
}

export default ProjectHeader