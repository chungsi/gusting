import * as React from 'react'
import { format } from 'date-fns'

const Footer = () => {
  return (
    <footer class='footer'>
      <p>Made with <a href='https://www.gatsbyjs.com/' target='_blank' rel="noreferrer">GatsbyJs</a></p>
      <p>Last updated: {format(new Date(), 'MMMM yyyy')}</p>
    </footer>
  )
}

export default Footer