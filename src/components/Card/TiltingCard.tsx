import * as React from 'react'

import BaseCard, { BaseCardProps } from './BaseCard'
import CategoryIcon from '../CategoryIcon'
import HeroImage from './HeroImage'

import { concat } from '../../utils/helpers'

const TiltingCard = ({
  link,
  frontmatter,
  id,
  className,
}: BaseCardProps) => {
  const { category, heroImage, heroImagePos } = frontmatter ?? {}

  const categoryIcon = <CategoryIcon
    category={category ?? ''}
    className='absolute w-5 left-[-.25rem]'
  />

  return (
    <BaseCard
      id={id ?? ''}
      link={link ?? ''}
      frontmatter={frontmatter}
      accents={categoryIcon}
      className={concat(
        '[--bg-rotate:-1.5deg]',
        'even:[--bg-rotate:2deg]',
        'third:[--bg-rotate:-5deg]',
        className ?? ''
      )}
    >

      {/* BG box */}
      <span
        aria-hidden
        className={concat(
          'absolute block h-full w-full top-0 left-0 -z-[1]',
          'bg-th-bg',
          'rotate-[length:var(--bg-rotate)]',
        )}
      />

      {heroImage && <HeroImage image={heroImage} pos={heroImagePos} />}

    </BaseCard>
  )
}

export default TiltingCard