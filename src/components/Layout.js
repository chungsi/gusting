import * as React from 'react'
import { Link } from 'gatsby'
import * as scss from './Layout.module.css'
// import Logo from '../images/svg/logo.inline.svg'
import Base from './Layout/BaseLayout'

// TODO: Update this component, because currently only used on the home/landing page
const Layout = ({ children }) => {

  const navLink = (path, text) => (
    <li id={text} className={scss.navLinkItem}>
      <Link
        to={path}
        className={scss.navLinkText}
        activeClassName={scss.navLinkTextActive}
        // partiallyActive={true}
        getProps={ ({isCurrent, isPartiallyCurrent}) => {
          const activeOutput = { className:`${scss.navLinkText} ${scss.navLinkTextActive}` }
          if (path === '/') {
            // Need to check for separate flag isCurrent for the home page
            return isCurrent ? activeOutput : null
          } else {
            return isPartiallyCurrent ? activeOutput : null
          }
        }}
        >
          {text}
      </Link>
    </li>
  )

  const navLinks = [
    // ['/', 'Home'],
    ['/about', 'About'],
    ['/blog', 'Blog'],
    ['/project', 'Projects'],
    ['/listings', 'Listings'],
    ['/art', 'Art'],
    ['/design', 'Design']
  ]

  return (
    <Base>
      <nav>
        <ul className={scss.navLinks}>
          {navLinks.map(link => navLink(link[0], link[1]))}
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </Base>
  )
}

export default Layout