import * as React from 'react'
import { Helmet } from 'react-helmet';

// TODO: double check if it's better to import css here on in gatsby-browser.js
import '../../css/global.css'

import { concat } from '../../utils/helpers';

type BaseLayoutProps = {
  className?: string
  bodyClassName?: string
  id?: string
  children?: React.ReactNode | React.ReactNode[]
}

const BaseLayout = ({
  className,
  bodyClassName,
  id,
  children
}: BaseLayoutProps) => {

  console.log('custom id', id)

  return (
    <>
      <Helmet>
        <body className={concat(
          'text-th-text font-mono text-md font-normal',
          bodyClassName ?? ''
        )}/>
      </Helmet>
      <main className={className ?? ''} id={id ?? ''}>
        {children}
      </main>
    </>
  )
}

export default BaseLayout