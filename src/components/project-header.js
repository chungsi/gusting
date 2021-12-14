import * as React from 'react'
import * as scss from './project-header.module.scss'

const ProjectHeader = ({ props, children }) => {

  return (
    <header className={scss.header}>
      <h1 className={`h0 ${scss.title}`}>
        {props.title}
        <span className={scss.category}>
          &#123; {props.category} &#125;
        </span>
      </h1>
      <p className={scss.subtitle}>{props.subtitle}</p>
    </header>
  )
}

export default ProjectHeader