import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Footer = () => {
  const buildDateQuery = useStaticQuery(graphql`
    query BuildDateQuery {
      currentBuildDate {
        currentDate
      }
    }
  `)

  return (
    <footer className='mt-3xl mb-xl py-lg font-light border-t border-solid border-th-highlight'>
      <p>Last updated: {buildDateQuery.currentBuildDate.currentDate}</p>
      <p>
        Sketchblog:
        [<a href={`https://www.instagram.com/chungsi_/`} target='_blank' rel='noreferrer'>instagram</a>]
        [<a href={`https://www.twitter.com/chungsi_/`} target='_blank' rel='noreferrer'>twitter</a>]
      </p>
      <p>
        Made with <a href='https://www.gatsbyjs.com/' target='_blank' rel='noreferrer'>GatsbyJs</a>:
        [<a href='https://github.com/chungsi/gusting' target='_blank' rel='noreferrer'>Github repo</a>]
      </p>
    </footer>
  )
}

export default Footer
