import * as React from 'react'
import { format } from 'date-fns'

const Footer = () => {
  return (
    <footer class='footer'>
      <p>Last updated: {format(new Date(), 'MMMM yyyy')}</p>
      <p>Made with <a href='https://www.gatsbyjs.com/' target='_blank' rel="noreferrer">GatsbyJs</a></p>
    </footer>
  )
}

export default Footer