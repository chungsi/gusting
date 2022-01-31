import * as React from 'react'
import * as scss from './projectHeader.module.scss'
import { graphql } from 'gatsby'
import { getSrc } from 'gatsby-plugin-image'
import CategoryIcon from './CategoryIcon'

const ProjectHeader = ({ frontmatter: { title, subtitle, category, tags, heroImage }, className }) => {
  var hasHeroImage = heroImage != null ? true : false

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
      <p><small>
        {tags.map(tag => `${tag} / `)}
      </small></p>
      {hasHeroImage &&
        <img src={getSrc(heroImage)}
          alt=''
          className={`${scss.heroImage}`}
          aria-hidden />
      }
    </header>
  )
}

// export const query = graphql`
//   fragment ProjectHeaderFragment on Mdx {
//     frontmatter {
//       title
//       subtitle
//       category
//       heroImage {
//         childImageSharp {
//           gatsbyImageData
//         }
//       }
//     }
//   }
// `

export default ProjectHeader