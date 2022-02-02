import * as React from 'react'
// import { format } from 'date-fns'

const Footer = () => {
  return (
    <footer className='footer'>
      {/* <p>Last updated: {format(new Date(), 'MMMM yyyy')}</p> */}
      <p>
        Sketchblog: [instagram] [twitter]
      </p>
      <p>
        Made with <a href='https://www.gatsbyjs.com/' target='_blank' rel='noreferrer'>GatsbyJs</a>:
        [<a href='https://github.com/chungsi/gusting' target='_blank' rel='noreferrer'>Github repo</a>]
      </p>
    </footer>
  )
}

export default Footer