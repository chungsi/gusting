import { Link } from 'gatsby'
import * as React from 'react'
import Base from './base'
import Logo from '../images/svg/logo.inline.svg'

const ContentTemplate = ({title, subtitle, children}) => {

  return (
    <Base>
      <div className='project-container'>
        <Link to='/' className='logo'>
          <Logo />
        </Link>
        {children}
      </div>
    </Base>
  )
}

export default ContentTemplate