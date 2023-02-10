import * as React from 'react'
import { GatsbyImage, IGatsbyImageData, getSrc } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

import { concat } from '../../utils/helpers'

type MdxImageProps = {
  gatsbyImageData: IGatsbyImageData
  imageURL?: string
  link?: boolean | string | IGatsbyImageData
  caption?: string
  paragraphWidth?: boolean
  offset?: boolean
  halfOffset?: boolean
  shadow?: boolean
}

const MdxImage = ({
  gatsbyImageData,
  imageURL,
  link,
  caption,
  paragraphWidth,
  offset,
  halfOffset,
  shadow
}: MdxImageProps) => {

  // Handle different offset variation classes
  var offsetClasses = '';
  if (halfOffset) {
    offsetClasses = '-mx-[calc(var(--space-container-offset)_/_2_-_1rem)]'
  } else if (offset) {
    offsetClasses = '-mx-[calc(var(--space-container-offset)_-_1rem)]'
  } else if (paragraphWidth) {
    offsetClasses = 'max-w-[length:var(--max-text-width)]'
  }
  // } else if (rightOffset) {
  //   offsetClasses = '-mr-[calc(var(--space-container-offset)_/_2_-_1rem)]'

  // TODO: streamline this feature????
  var imageLink: string | undefined
  if (link && typeof link == 'object') {
    imageLink = getSrc(link)
  } else if (link && typeof link == 'string') {
    imageLink = link
  }

  return (
    <article className='relative mt-lg first:mt-0'>
      {gatsbyImageData &&
        <GatsbyImage
          image={gatsbyImageData}
          alt={caption ?? ''}
          loading='lazy'
          className={concat(
            shadow ? 'shadow-lg' : '',
            offsetClasses
          )}
        />
      }
      {/* TODO: what is imageURL & imageLink??? I forget */}
      {imageURL &&
        <img
          src={imageURL}
          alt=""
          className={concat(
            shadow ? 'shadow-lg' : '',
            offsetClasses
          )}
        />
      }
      {imageLink &&
        <Link
          to={imageLink}
          className={concat(
            'absolute w-full h-full top-0 left-0'
          )}
        />
      }
      {caption &&
        <p className="text-sm text-gray-400">{caption}</p>
      }
    </article>
  )
}

export default MdxImage