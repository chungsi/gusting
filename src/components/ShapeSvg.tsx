import * as React from 'react'
import Shape1 from '../images/svg/shape-1.inline.svg'
// import Shape2 from '../images/svg/shape-2.inline.svg'
import Shape3 from '../images/svg/shape-3.inline.svg'
import Shape4 from '../images/svg/shape-4.inline.svg'
import Shape5 from '../images/svg/shape-5.inline.svg'
import { concat } from '../utils/helpers'

const ShapeSvg = ({category, className}: {category?: string, className?: string}) => {
  var shape = <Shape1 />

  switch (category) {
    case 'storytelling':
      shape = <Shape5 />
      break
    case 'dev':
      shape = <Shape3 />
      break
    case 'design':
      shape = <Shape4 />
      break
    case 'art':
    default:
  }

  return (
    <div
      className={concat(
        'shape-bg',
        category ?? '',
        className ?? ''
      )}
      aria-hidden
    >
      {shape}
    </div>
  )
}

export default ShapeSvg