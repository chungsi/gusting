import { Link } from 'gatsby'
import * as React from 'react'
import Base from './base'
import Logo from '../images/svg/logo.inline.svg'

const ContentLayout = ({header, className, children}) => {

  return (
    <Base className={`project-container ${className ?? ''}`}>
      <Link to='/' className='logo'>
        <Logo />
      </Link>
      {header &&
        <div className='project-header'>
          {header}
        </div>
      }
      <section className='project-content'>
        {children}
      </section>
    </Base>
  )
}

export default ContentLayout