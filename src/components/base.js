import * as React from 'react'
import '../scss/global.scss'

const Base = ({children, className}) => {
  var classList = 'container';
  if (className) {
    classList += ` ${className}`;
  }

  return (
    <div className={classList}>
      {children}
    </div>
  )
}

export default Base