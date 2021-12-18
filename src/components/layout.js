import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import '../scss/global.scss'
import * as scss from './layout.module.scss'
import Logo from '../images/svg/logo.inline.svg'

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  const navLink = (path, text) => (
    <li className={scss.navLinkItem}>
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
    ['/listings', 'Listings']
  ]

  return (
    <div className={scss.container}>
      <header className={scss.header}>
        <Link to='/' className={scss.logo}>
          {/* <StaticImage
            alt='Logo'
            src='../images/logo.svg' /> */}
          <Logo />
        </Link>
        {/* <h1 className={scss.siteTitle}>
          {data.site.siteMetadata.title}
        </h1> */}
      </header>
      <nav>
        <ul className={scss.navLinks}>
          {navLinks.map(link => navLink(link[0], link[1]))}
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout