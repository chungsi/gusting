import * as React from 'react'
import '../scss/global.scss'

const Base = ({children, className}) => {
  return (
    <div className={`container ${className && className}`}>
      {children}
    </div>
  )
}

export default Base