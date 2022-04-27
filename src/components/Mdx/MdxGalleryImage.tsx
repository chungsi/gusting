import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { concat } from '../../utils/helpers'

// TODO: Create generic image container that this component calls for gatsby image
// so that it can be used within grid
const MdxGalleryImage = ({
  gatsbyImageData,
  caption,
  cover,
  backCover,
  offset,
  children
}) => {

  return (
    <article className='mb-2xl'>
      <GatsbyImage
        image={gatsbyImageData}
        alt={caption ?? ''}
        loading='lazy'
        className={concat(
          'shadow-xl',
          offset ? '-mx-[calc(var(--space-container-offset)_-_1rem)]' : '',
          cover ? 'md:ml-[50%]' : '',
          backCover ? 'md:mr-[50%]' : ''
        )}
      />
      {(children || caption) &&
        <section className={cover ? 'md:ml-[calc(50%_+_var(--space-xl))]' : ''}>
          {caption &&
            <p className={concat(
              'text-gray-400',
              // Add some space between caption and any other text
              '!mb-xl',
              // Offset to right a bit in portrait mode
              !offset ? 'md:ml-2xl' : ''
            )}>
              {caption}
            </p>
          }
          {children}
        </section>
      }
    </article>
  )
}

export default MdxGalleryImage