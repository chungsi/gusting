import * as React from 'react'
import Hexagon from '../images/svg/icon-hexagon.inline.svg'
import Trapezoid from '../images/svg/icon-trapezoid.inline.svg'
import Triangle from '../images/svg/icon-triangle.inline.svg'
import Pentagon from '../images/svg/icon-pentagon.inline.svg'

type CategoryIconProps = {
  category: string
  className?: string
}

const CategoryIcon = ({category, className}: CategoryIconProps) => {
  let shape: JSX.Element = <Triangle />

  switch (category) {
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