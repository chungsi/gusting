import * as React from 'react'
import BaseCard from './BaseCard'
import { concat } from '../../utils/helpers'
import CategoryIcon from '../CategoryIcon'

const TiltingCard = ({
  link,
  cardId,
  className,
  frontmatter
}) => {

  var categoryIcon = <CategoryIcon
    category={frontmatter.category}
    className='absolute w-5 left-[-.25rem]' />

  return (
    <BaseCard
      link={link}
      frontmatter={frontmatter}
      accents={categoryIcon}
      className={concat(
        '[--bg-rotate:-3deg]',
        'even:[--bg-rotate:2deg]',
        'third:[--bg-rotate:-5deg]'
      )}
    >

      <span
        aria-hidden
        class={concat(
          'absolute block h-full w-full top-0 left-0 -z-10',
          'bg-th-bg',
          'rotate-[length:var(--bg-rotate)]',
        )}
      />

    </BaseCard>
  )
}

export default TiltingCard