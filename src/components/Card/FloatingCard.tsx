import * as React from 'react'

import BaseCard, { BaseCardProps } from './BaseCard'
import { concat } from '../../utils/helpers'
import HeroImage from './HeroImage'

const FloatingCard = ({
  link,
  frontmatter,
  id,
  className,
}: BaseCardProps) => {
  const { heroImage, heroImagePos } = frontmatter ?? {}

  return (
    <BaseCard
      id={id}
      link={link}
      frontmatter={frontmatter}
      className={concat(
        'relative',
        'shadow-xl shadow-cobalt-800/20',
        className ?? ''
      )}
    >
      {heroImage && <HeroImage image={heroImage} pos={heroImagePos} />}
    </BaseCard>
  )
}

export default FloatingCard