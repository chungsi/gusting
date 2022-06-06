import * as React from 'react'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../hooks/useSiteMetadata'

type SeoProps = {
  title: string
  description?: string
  // image?: 
  home?: boolean
}

// TODO: add a condition for home page title that will be different
const Seo = ({ title, description, home }: SeoProps) => {
  const siteSeo = useSiteMetadata()

  var titleTemplate = `%s | ${siteSeo?.title}`
  if (home) titleTemplate = '%s'

  const seo = {
    title: title ?? null,
    titleTemplate: titleTemplate,
    description: description ?? '',
    // description: description ?? siteSeo?.description,
    // Site Settings image is called placeholderImage (not image!)
    // image: image ?? siteSeo?.placeholderImage?.asset.url,
    // favicon: siteSeo?.favicon?.asset.url
  }

  return (
    <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
      {seo.title && <meta property='og:title' content={seo.title} />}
      {/* {siteSeo?.title && <meta property='og:site_name' content={siteSeo.title} />} */}

      {seo.description &&
        <>
          <meta name='description' content={seo.description} />
          <meta property='og:description' content={seo.description} />
          <meta property='twitter:description' content={seo.description} />
        </>
      }

      {/*
      {seo.image &&
        <meta name='image' content={seo.image} />
        <meta name='thumbnail' content={seo.image} />
        <meta property='og:image' content={seo.image} />
        <meta property='twitter:image' content={seo.image} />
      }
      */}

      <meta name='og:type' content='website' />
      {/*
        <meta property='og:url' content='' />
      */}

      {/* TODO: Should I use the config variables or just hardcode since I won't be changing this...? */}
      <meta property='twitter:site' content={`@${siteSeo?.socials?.twitter}`} />
      <meta property='twitter:card' content='summary' />
      {/*
      */}

      {/* {seo.favicon && <link rel='shortcut icon' type='image/png' href={seo.favicon} />} */}
    </Helmet>
  )
}

export default Seo