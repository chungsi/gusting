import * as React from 'react'
import { getSrc, IGatsbyImageData } from 'gatsby-plugin-image'

import CategoryIcon from './CategoryIcon'

import { concat } from '../utils/helpers'

type ProjectHeaderProps = {
  frontmatter: {
    title: string | null
    subtitle?: string | null
    category?: string | null
    tags?: readonly (string | null)[] | null
    heroImage?: object | null
  }
  withHeroImage?: boolean
  className?: string
}

const ProjectHeader = ({
  frontmatter: { title, subtitle, category, tags, heroImage },
  withHeroImage,
  className
}: ProjectHeaderProps) => {

  // var subtitleFormatClasses = concat(
  //   'pr-10 md:pl-0'
  // )

  return (
    <header className={concat('relative', className ?? '')}>
      {category &&
        <CategoryIcon
          category={category}
          className={concat(
            'absolute w-7 -top-8 left-2',
            'lg:w-8 lg:top-2 lg:left-[-4.5rem]'
          )}
        />
      }

      <h1 className='relative inline-block mb-xs'>
        {title}

        {category &&
          <span className={concat(
            'font-mono italic font-light text-sm',
            'inline-block p-[0_1em]'
          )}>
            &#123;{category}&#125;
          </span>
        }

        <span
          aria-hidden
          className={concat(
            'absolute block top-[-12px] left-[-10px] w-full h-full',
            'rotate-[-2deg] z-[-1] bg-th-highlight'
          )}
        />
      </h1>

      {subtitle &&
        <p className={concat('italic text-lg')}>{subtitle}</p>
      }

      {tags &&
        <p className={concat('text-sm')}>
          {tags.map(tag => `${tag} / `)}
        </p>
      }

      {withHeroImage && heroImage &&
        <img
          aria-hidden
          src={getSrc(heroImage as IGatsbyImageData)}
          alt=''
          className={concat(
            'absolute right-[-2rem] top-[-1rem] z-[-1] opacity-70',
            'block max-w-[7rem]',
            'md:max-w-[10rem]',
          )}
        />
      }
    </header>
  )
}

export default ProjectHeader