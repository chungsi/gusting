import { PageProps } from 'gatsby'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { ProjectMdxFrontmatterGalleryFragment } from '../@types/graphql-generated-types'

/**
 * Concatenate class names together with a space between each.
 *
 * @param  {...String} classNames
 * @returns A string of classnames separated by a space.
 */
export const concat = (...classNames: string[]): string => {
  return classNames.filter(Boolean).join(' ')
}

/**
 * Takes an input path string and converts it into a valid path with only a-z, 0-9, or - characters. This method also makes sure that the path does not have duplicate / throughout the path.
 *
 * @param {String} path Any path to be converted into a valid string path
 * @returns A valid string path
 */
export const slugify = (path: string): string => {
  const slug = path
    .toLowerCase()
    .replace(/[^a-z0-9/#=?&]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  return slug.replace(/\/\/+/g, '/')
}

// The type for query parameters
type QueryParams = {
  name: string
  value: string
}

/**
 * Return a query parameter string from an array of query parameter objects.
 *
 * @param queryParams An array of objects with the structure of {name: 'paramName', value: 'paramValue'}
 * @returns A single query parameter string with all parameters joined
 */
export const getQueryParams = (queryParams: QueryParams[]): string => {
  return queryParams.map(param => `${param.name}=${param.value}`).join('&')
}

/**
 * Return a slugified string path from a series of parameter.
 *
 * @param subPath A string for the subpath after the URL
 * @param slug The slug of the page
 * @param queryParams An array of query parameter objects (optional)
 * @returns A full slugified relative path from the root
 */
export const generatePath = (
  subPath: string,
  slug: string,
  queryParams?: QueryParams[]
): string => {
  const queryParamsString = queryParams ? `?${getQueryParams(queryParams)}` : null
  return slugify(`/${subPath}/${slug}${queryParamsString}`)
}

/**
 * Return a properly formatted path to a project page.
 *
 * @param slug The slug of the page
 * @param queryParams An array of objects with the structure of {name: 'paramName', value: 'paramValue'}
 * @returns The path to a specific project page
 */
export const getProjectPath = (slug: string, queryParams?: QueryParams[]) => {
  return generatePath('project', slug, queryParams)
}


// TODO: write tests for this...
export const getGalleryImagesArrayForMdx = (
  frontmatter: ProjectMdxFrontmatterGalleryFragment["frontmatter"]
): Record<string, string | IGatsbyImageData> => {

  var galleryImages: Record<string, string | IGatsbyImageData> = {}

  if (frontmatter?.gallery) {
    frontmatter.gallery.forEach((image, i) => {
      // TODO: better way to check existence and cast as type?
      // console.log('testing condition check', image?.childImageSharp, image?.childImageSharp?.gatsbyImageData)
      if (image?.childImageSharp != null) {
        galleryImages[`image${i + 1}`] =
          getImage(image as IGatsbyImageData) ?? ""
      } else {
        galleryImages[`image${i + 1}`] = image?.publicURL ?? ""
      }
    })
  }

  return galleryImages
}


// TODO: write tests for this...
export const getHomeUrlParam = (
  location: PageProps["location"],
  paramKey: string
): string | null => {
  var homeUrlParam: string | null = null

  if (location.href) {
    const urlParams = new URL(location.href).searchParams
    homeUrlParam = urlParams.has(paramKey) ? urlParams.get(paramKey) : null
  }

  return homeUrlParam
}


// TODO: write tests for this...
export const getHomeTitle = (homeKey: string | null): string | null => {
  if (homeKey === "design") return useSiteMetadata()?.designHome?.title ?? null
  else if (homeKey === "art") return useSiteMetadata()?.artHome?.title ?? null
  return null
}


// If need to use functions in gatsby-node, need this format for js,
// but might be different for tsx?
// module.exports = {
//   concat: concat,
//   slugify: slugify,
// }