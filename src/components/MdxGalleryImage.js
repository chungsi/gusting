import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { concat } from '../utils/helpers'

// TODO: Create something in here or in another component for making
// a grid of images; or just more layout control in general
// TODO: Create a container for other media as well (like videos); do
// I want it to be expanded beyond the content container too?
const MdxGalleryImage = ({
  gatsbyImageData,
  caption,
  cover,
  backCover,
  landscape,
  children
}) => {

  return (
    <article className='mt-2xl first:mt-0'>
      <GatsbyImage
        image={gatsbyImageData}
        alt={caption ?? ''}
        loading='lazy'
        className={concat(
          'drop-shadow-xl',
          landscape ? '-mx-4xl' : '',
          cover ? 'ml-[50%]' : '',
          backCover ? 'mr-[50%]' : ''
        )}
      />
      {(children || caption) &&
        <section className={cover ? 'ml-[calc(50%_+_var(--space-xl))]' : ''}>
          {caption &&
            <p className={concat(
              // Add some space between caption and any other text
              '!mb-xl',
              // Offset to right a bit in portrait mode
              !landscape ? '!ml-2xl' : ''
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