import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { concat } from '../../utils/helpers'

const MdxImage = ({
  gatsbyImageData,
  imageURL,
  offset
}) => {

  return (
    <article className='mt-lg first:mt-0'>
      {gatsbyImageData &&
        <GatsbyImage
        image={gatsbyImageData}
        alt=""
        // alt={caption ?? ''}
        loading='lazy'
        className={concat(
          offset ? '-mx-[calc(var(--space-container-offset)_-_1rem)]' : 'max-w-[length:var(--max-text-width)]',
          )}
        />
      }
      {imageURL &&
        <img
          src={imageURL}
          alt=""
          className={concat(
            offset ? '-mx-[calc(var(--space-container-offset)_-_1rem)]' : 'max-w-[length:var(--max-text-width)]',
            )}
        />
      }
    </article>
  )
}

export default MdxImage