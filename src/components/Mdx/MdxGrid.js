import * as React from 'react'
import { concat } from '../../utils/helpers'

const MdxGrid = ({
  offset,
  fullOffset,
  two,
  three,
  four,
  five,
  children
}) => {

  return (
    <div className={concat(
      'grid gap-8',
      // offset ? '-mr-[var(--space-container-offset)]' : 'max-w-[length:var(--max-text-width)]',
      fullOffset ? '-mx-[var(--space-container-offset)]' : '',
      two ? 'md:grid-cols-2' : '',
      three ? 'md:grid-cols-3' : '',
      four ? 'lg:grid-cols-4' : '',
      five ? 'lg:grid-cols-5' : ''
    )}>
      {children}
    </div>
  )
}

export default MdxGrid