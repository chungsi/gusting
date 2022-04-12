import * as React from 'react'
import { getSrc } from 'gatsby-plugin-image'

import CategoryIcon from './CategoryIcon'
import { concat } from '../utils/helpers'

const ProjectHeader = ({ frontmatter: { title, subtitle, category, tags, heroImage }, className }) => {
  var hasHeroImage = heroImage != null ? true : false

  return (
    <header className={className ?? ''}>
      <CategoryIcon
        category={category}
        className={concat(
          'absolute w-7 -top-8 left-2',
          'lg:w-8 lg:top-2 lg:left-[-4.5rem]'
        )}
      />

      <h1 className='relative inline-block mb-xs'>
        {title}

        <span className={concat(
          'font-mono italic font-light text-sm',
          'inline-block p-[0_1em]'
        )}>
          &#123;{category}&#125;
        </span>

        <span
          aria-hidden
          className={concat(
            'absolute block top-[-12px] left-[-10px] w-full h-full',
            'rotate-[-2deg] z-[-1] bg-th-highlight'
          )}
        />
      </h1>

      <p className='italic text-lg'>{subtitle}</p>

      <p className='text-sm'>
        {tags.map(tag => `${tag} / `)}
      </p>

      {hasHeroImage &&
        <img
          aria-hidden
          src={getSrc(heroImage)}
          alt=''
          className={concat(
            'absolute right-[-2rem] top-[-1rem] z-[-1] opacity-70',
            'hidden max-w-[7rem]',
            'sm:block md:max-w-[10rem]',
          )}
        />
      }
    </header>
  )
}

export default ProjectHeader