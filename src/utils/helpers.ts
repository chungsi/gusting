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
 * Takes an input path string and converts it into a valid path with only a-z, 0-9, or - (for spaces) characters. This method also makes sure that the path does not have duplicate / throughout the path.
 *
 * @param {String} path Any path to be converted into a valid string path
 * @returns A valid string path
 */
export const slugify = (path: string): string => {
  const slug = path
    .toLowerCase()
    .replace(/[^a-z0-9/#]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  return slug.replace(/\/\/+/g, '/')
}

/**
 * TODO: Insert a generatePath function here...
 */
// If need to use functions in gatsby-node, need this format for js,
// but might be different for tsx?
// module.exports = {
//   concat: concat,
//   slugify: slugify,
// }