import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as scss from './layout.module.scss'


const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
      <div className={scss.container}>
        <title>{pageTitle}</title>
        <header className={scss.siteTitle}>
          {data.site.siteMetadata.title}
        </header>
        <nav>
          <ul className={scss.navLinks}>
            <li className={scss.navLinkItem}>
              <Link to="/" className={scss.navLinkText}>Home</Link>
            </li>
            <li className={scss.navLinkItem}>
              <Link to="/about" className={scss.navLinkText}>About</Link>
            </li>
            <li className={scss.navLinkItem}>
              <Link to="/blog" className={scss.navLinkText}>Blog</Link>
            </li>
            <li className={scss.navLinkItem}>
              <Link to="/project" className={scss.navLinkText}>Projects</Link>
            </li>
          </ul>
        </nav>
        <main>
          <h1 className={scss.heading}>{pageTitle}</h1>
          {children}
        </main>
      </div>
    )
}

export default Layout