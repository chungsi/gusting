import * as React from 'react'
import Shape1 from '../images/svg/shape-1.inline.svg'
import Shape2 from '../images/svg/shape-2.inline.svg'
import Shape3 from '../images/svg/shape-3.inline.svg'
import Shape4 from '../images/svg/shape-4.inline.svg'
import Shape5 from '../images/svg/shape-5.inline.svg'

const ShapeSvg = ({category, className}) => {
  var shape = <Shape1 />
  var classList = `shape-bg ${category} ${className ?? ''}`;

  switch (String(category)) {
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
    <div className={classList} aria-hidden>
      {shape}
    </div>
  )
}

export default ShapeSvg