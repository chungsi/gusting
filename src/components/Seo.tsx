import * as React from 'react'
import { Helmet } from 'react-helmet'

import OgImageArt from '../images/ogImage_square_art.jpg'

import { useSiteMetadata } from '../hooks/useSiteMetadata'

type SeoProps = {
  title: string | null | undefined
  slug: string,
  description?: string | null | undefined
  image?: string | null | undefined
  homeTitle?: string | null | undefined
  home?: boolean
}

const Seo = ({
  title,
  slug,
  description,
  image,
  home,
  homeTitle
}: SeoProps) => {
  const siteSeo = useSiteMetadata()

  var titleTemplate = `%s | ${homeTitle ?? siteSeo?.title}`
  if (home) titleTemplate = '%s'

  const seo = {
    title: title ?? siteSeo?.title ?? undefined,
    description: description ?? undefined,
    canonicalUrl: siteSeo?.siteUrl + slug,
    image: image ?? OgImageArt,
  }

  return (
    <Helmet titleTemplate={titleTemplate}>
      <title>{seo.title}</title>
      <meta name='description' content={seo.description} />

      <meta name='image' content={seo.image} />

      <meta property='og:title' content={seo.title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={seo.canonicalUrl} />
      <meta property='og:image' content={seo.image} />
      <meta property='og:description' content={seo.description} />

      <meta property='twitter:description' content={seo.description} />
      <meta property='twitter:image' content={seo.image} />
      <meta property='twitter:site' content='@chungsi_' />
      <meta property='twitter:card' content='summary' />

      {/* TODO: A custom set favicon here? Only if I want different icons for different parts of the site */}
      {/* {seo.favicon && <link rel='shortcut icon' type='image/png' href={seo.favicon} />} */}
    </Helmet>
  )
}

export default Seo