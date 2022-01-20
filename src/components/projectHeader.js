import * as React from 'react'
import * as scss from './projectHeader.module.scss'
import CategoryIcon from './categoryIcon'

const ProjectHeader = ({ title, subtitle, category, heroImgSrc, className }) => {
  var hasHeroImage = heroImgSrc != null ? true : false

  return (
    <header className={className ?? ''}>
      <CategoryIcon category={category} className={scss.categoryIcon} />
      <h1 className={scss.title}>
        {title}
        <span className={scss.category}>
          &#123;{category}&#125;
        </span>
      </h1>
      <p className={scss.subtitle}>{subtitle}</p>
      {hasHeroImage &&
        <img src={heroImgSrc}
          className={`${scss.heroImage}`}
          aria-hidden />
      }
    </header>
  )
}

export default ProjectHeader