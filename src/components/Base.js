import * as React from 'react'
import '../scss/global.scss'

const Base = ({children, className, customIds}) => {
  var classList = 'container';
  if (className) {
    classList += ` ${className}`;
  }

  return (
    <main className={classList} id={customIds ?? ''}>
      {children}
    </main>
  )
}

export default Base