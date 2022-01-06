import { Link } from 'gatsby'
import * as React from 'react'
import Base from './base'
import Logo from '../images/svg/logo.inline.svg'

const ContentTemplate = ({header, children}) => {

  return (
    <Base>
      <div className='project-container'>
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
      </div>
    </Base>
  )
}

export default ContentTemplate