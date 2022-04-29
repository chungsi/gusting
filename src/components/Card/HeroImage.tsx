import * as React from 'react'
import { getSrc, IGatsbyImageData } from 'gatsby-plugin-image'

import { concat } from '../../utils/helpers'

const HeroImage = ({ image, pos }: { image: object, pos?: string | null}) => {
  return (
    <img
      aria-hidden
      alt=''
      src={getSrc(image as IGatsbyImageData)}
      className={concat(
        'absolute block max-w-[7.25rem] -z-[1] transition',
        'group-hover:translate-x-1 group-hover:-translate-y-1',

        'right-0', // Default
        pos === 'top' ? '!-right-8 -top-8' : '',
        pos === 'bottom' ? 'right-0 -bottom-6' : '',
        pos === 'right' ? '!-right-10 bottom-0' : '',
      )}
    />
  )
}

export default HeroImage