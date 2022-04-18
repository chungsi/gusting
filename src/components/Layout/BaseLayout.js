import * as React from 'react'
import { Helmet } from 'react-helmet';

import '../../scss/global.scss'

import { concat } from '../../utils/helpers';

const BaseLayout = ({
  className,
  bodyClassName,
  id,
  children
}) => {

  console.log('custom id', id)

  return (
    <>
      <Helmet>
        <body className={concat(
          'text-th-text font-mono text-md font-normal',
          bodyClassName
        )}/>
      </Helmet>
      <main className={className} id={id ?? ''}>
        {children}
      </main>
    </>
  )
}

export default BaseLayout