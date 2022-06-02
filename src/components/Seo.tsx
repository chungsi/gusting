import * as React from 'react'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../hooks/useSiteMetadata'

type SeoProps = {
  title: string
  description?: string
  // image?: 
}

// TODO: add a condition for home page title that will be different
const Seo = ({ title, description }: SeoProps) => {
  const siteSeo = useSiteMetadata()

  const seo = {
    title: title ?? null,
    titleTemplate: `%s | ${siteSeo?.title}`,
    description: description ?? '',
    // description: description ?? siteSeo?.description,
    // Site Settings image is called placeholderImage (not image!)
    // image: image ?? siteSeo?.placeholderImage?.asset.url,
    // favicon: siteSeo?.favicon?.asset.url
  }

  return (
    <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
      {seo.title && <meta property='og:title' content={seo.title} />}
      {siteSeo?.title && <meta property='og:site_name' content={siteSeo.title} />}

      {seo.description &&
        <>
          <meta name='description' content={seo.description} />
          <meta property='og:description' content={seo.description} />
        </>
      }

      {/* <meta name='image' content={seo.image} />
      {seo.image && <meta property='og:image' content={seo.image} />} */}

      <meta name='og:type' content='website' />

      <meta name='twitter:card' content='summary_large_card' />

      {/* {seo.favicon && <link rel='shortcut icon' type='image/png' href={seo.favicon} />} */}
    </Helmet>
  )
}

export default Seo