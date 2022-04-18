import * as React from 'react'
import { concat } from '../../utils/helpers'

const MdxGrid = ({
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
      fullOffset ? '-mx-[var(--space-container-offset)]' : '-mr-[var(--space-container-offset)]',
      two ? 'grid-cols-2' : '',
      three ? 'grid-cols-3' : '',
      four ? 'grid-cols-4' : '',
      five ? 'grid-cols-5' : ''
    )}>
      {children}
    </div>
  )
}

export default MdxGrid