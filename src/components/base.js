import * as React from 'react'
import '../scss/global.scss'

const Base = ({children}) => {
  return (
    <div className='container'>
      {children}
    </div>
  )
}

export default Base