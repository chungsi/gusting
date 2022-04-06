import * as React from 'react'
import { Link } from 'gatsby'
import Base from './Base'
import Logo from '../images/svg/logo.inline.svg'

const ContentLayout = ({header, homeUrl, className, children}) => {

  // Here detect location stuff and change the logo link
  // console.log(homeUrl)

  return (
    <Base className={`project-container ${className ?? ''}`}>
      <Link
        to={homeUrl ? `/${homeUrl}` : '/'}
        className='logo'
      >
        <Logo />
      </Link>
      {header &&
        <div className='project-header'>
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