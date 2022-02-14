import * as React from 'react'
import { Helmet } from 'react-helmet';
import '../scss/global.scss'

const Base = ({children, className, customIds}) => {
  // var classList = 'container';
  var classList = '';
  if (className) {
    classList += ` ${className}`;
  }

  return (
    <>
      <Helmet>
        <body className='' />
      </Helmet>
      <main className={classList} id={customIds ?? ''}>
        {children}
      </main>
    </>
  )
}

export default Base