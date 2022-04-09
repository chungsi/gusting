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
        className='absolute w-8 top-2 left-[-4.5rem]' />

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
            'rotate-[-2deg] z-[-1]',
            'bg-th-highlight'
          )}
        />
      </h1>

      <p className='italic text-lg'>{subtitle}</p>

      <p className='text-sm'>
        {tags.map(tag => `${tag} / `)}
      </p>

      {hasHeroImage &&
        <img
          src={getSrc(heroImage)}
          alt=''
          className='absolute block max-w-[10rem] right-[-2rem] top-[-1rem]
                     z-[-1] opacity-70'
          aria-hidden />
      }
    </header>
  )
}

export default ProjectHeader