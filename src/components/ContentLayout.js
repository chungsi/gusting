import * as React from 'react'
import { Link } from 'gatsby'
import Base from './Base'
import Logo from '../images/svg/logo.inline.svg'
import { concat } from '../utils/helpers'

const ContentLayout = ({ header, homeUrl, className, children }) => {

  // Here detect location stuff and change the logo link
  // console.log(homeUrl)

  return (
    <Base className={concat(
      'pt-4xl mx-auto max-w-6xl px-[length:var(--space-container-offset)]',
      className ?? ''
    )}>

      <Link
        to={homeUrl ? `/${homeUrl}` : '/'}
        className={concat(
          'fixed block z-50 top-lg pl-0 md:pl-2',
          'min-w-[length:var(--space-xl)] w-2xl max-w-2xl',
          '-ml-2 lg:-ml-[var(--space-container-offset)] xl:-ml-[calc(var(--space-container-offset)_/_1.6)]'
        )}
      >
        <Logo />
      </Link>

      {header &&
        <div className={concat(
          'relative mb-md'
        )}>
          {header}
        </div>
      }

      <section className='project-content prose'>
        {children}
      </section>

    </Base>
  )
}

export default ContentLayout