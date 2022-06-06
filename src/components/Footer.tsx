import * as React from 'react'
import { format } from 'date-fns'

import { useSiteMetadata } from '../hooks/useSiteMetadata'

const Footer = () => {
  const socials = useSiteMetadata()?.socials

  return (
    <footer className='mt-3xl mb-xl py-lg font-light border-t border-solid border-th-highlight'>
      <p>Last updated: {format(new Date(), 'MMMM yyyy')}</p>
      <p>
        Sketchblog:
        [<a href={`https://www.instagram.com/${socials?.twitter}/`} target='_blank' rel='noreferrer'>instagram</a>]
        [<a href={`https://www.twitter.com/${socials?.instagram}/`} target='_blank' rel='noreferrer'>twitter</a>]
      </p>
      <p>
        Made with <a href='https://www.gatsbyjs.com/' target='_blank' rel='noreferrer'>GatsbyJs</a>:
        [<a href='https://github.com/chungsi/gusting' target='_blank' rel='noreferrer'>Github repo</a>]
      </p>
    </footer>
  )
}

export default Footer