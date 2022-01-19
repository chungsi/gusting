import * as React from 'react'
import '../scss/global.scss'

const Base = ({children, className, customIds}) => {
  var classList = 'container';
  if (className) {
    classList += ` ${className}`;
  }

  return (
    <div className={classList} id={customIds ?? ''}>
      {children}
    </div>
  )
}

export default Base