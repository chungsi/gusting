import * as React from 'react'
import { Helmet } from 'react-helmet'

import { useSiteMetadata } from '../hooks/useSiteMetadata'

type SeoProps = {
  title: string | undefined
  slug: string,
  description?: string | null | undefined
  homeTitle?: string | null | undefined
  home?: boolean
  // TODO: Add image capabilities
  // image?:
}

const Seo = ({
  title,
  description,
  slug,
  home,
  homeTitle
}: SeoProps) => {
  const siteSeo = useSiteMetadata()

  var titleTemplate = `%s | ${homeTitle ?? siteSeo?.title}`
  if (home) titleTemplate = '%s'

  const seo = {
    title: title ?? siteSeo?.title ?? undefined,
    description: description ?? undefined,
    canonicalUrl: useSiteMetadata()?.siteUrl + slug
    // image: image ?? siteSeo?.placeholderImage?.asset.url,
  }

  return (
    <Helmet titleTemplate={titleTemplate}>
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />

      {/*
      {seo.image &&
        <meta name='image' content={seo.image} />
        <meta name='thumbnail' content={seo.image} />
        <meta property='og:image' content={seo.image} />
        <meta property='twitter:image' content={seo.image} />
      }
      */}

      <meta property='og:title' content={seo.title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={seo.canonicalUrl} />
      <meta property='og:description' content={seo.description} />

      <meta property='twitter:description' content={seo.description} />
      <meta property='twitter:site' content='@chungsi_' />
      <meta property='twitter:card' content='summary' />

      {/* TODO: A custom set favicon here? Only if I want different icons for different parts of the site */}
      {/* {seo.favicon && <link rel='shortcut icon' type='image/png' href={seo.favicon} />} */}
    </Helmet>
  )
}

export default Seo