import * as React from 'react'
import { Link } from 'gatsby'
import * as scss from './Layout.module.scss'
// import Logo from '../images/svg/logo.inline.svg'
import Base from './Base'

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
      {/* <header className={scss.header}>
        <Link to='/' className={scss.logo}>
          <Logo />
        </Link>
        <div className={scss.titleBlock}>
          <h1 className={scss.siteTitle}>
            {data.site.siteMetadata.title}
          </h1>
          <p className={scss.siteSubtitle}>
            {data.site.siteMetadata.subtitle}
          </p>
        </div>
      </header> */}
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