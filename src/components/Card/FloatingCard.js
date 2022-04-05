import * as React from 'react'

import BaseCard from './BaseCard'
import { concat } from '../../utils/helpers'
import HeroImage from './HeroImage'

const FloatingCard = ({
  link,
  frontmatter,
  cardId,
  className,
}) => {
  const { heroImage, heroImagePos } = frontmatter

  return (
    <BaseCard
      id={cardId}
      link={link}
      frontmatter={frontmatter}
      className={concat(
        'relative',
        'shadow-xl shadow-cobalt-800/20',
        className
      )}
    >
      {heroImage && <HeroImage image={heroImage} pos={heroImagePos} />}
    </BaseCard>
  )
}

export default FloatingCard