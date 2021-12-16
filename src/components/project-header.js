import * as React from 'react'
import * as scss from './project-header.module.scss'

const ProjectHeader = ({ content }) => {
  return (
    <header>
      <h1 className={scss.title}>
        {content.title}
        <span className={scss.category}>
          &#123; {content.category} &#125;
        </span>
      </h1>
      <p className={scss.subtitle}>{content.subtitle}</p>
    </header>
  )
}

export default ProjectHeader