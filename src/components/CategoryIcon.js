import * as React from 'react'
import Hexagon from '../images/svg/icon-hexagon.inline.svg'
import Trapezoid from '../images/svg/icon-trapezoid.inline.svg'
import Triangle from '../images/svg/icon-triangle.inline.svg'
import Pentagon from '../images/svg/icon-pentagon.inline.svg'

const CategoryIcon = ({category, className}) => {
  var shape = <Triangle />

  switch (String(category)) {
    case 'storytelling':
      shape = <Pentagon />
      break
    case 'dev':
      shape = <Trapezoid />
      break
    case 'design':
      shape = <Hexagon />
      break
    case 'art':
    default:
  }

  return (
    <div className={className ?? ''} aria-hidden>
      {shape}
    </div>
  )
}

export default CategoryIcon