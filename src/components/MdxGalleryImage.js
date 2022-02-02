import * as React from 'react'
import * as scss from './MdxGalleryImage.module.scss'
import { GatsbyImage } from 'gatsby-plugin-image'

const MdxGalleryImage = ({style, caption, gatsbyImageData, children}) => {
  var pageClassList = scss.galleryPage

  console.log(pageClassList)

  if (style) {
    var styleList = style.split(' ')
    styleList.forEach(spec => {
      switch (String(spec)) {
        case 'landscape':
          pageClassList = `${pageClassList} ${scss[`landscape`]}`
          break
        case 'cover':
          pageClassList = `${pageClassList} ${scss[`cover`]}`
          break
        case 'back-cover':
          pageClassList = `${pageClassList} ${scss[`back-cover`]}`
          break
        default:
      }
    })
  }

  return (
    <article className={pageClassList}>
      <div className={scss.galleryPageImage}>
        <GatsbyImage
          // imgClassName='project-image'
          image={gatsbyImageData}
          alt={caption ?? ''}
          loading='lazy' />
      </div>
      <section className={scss.galleryPageText}>
        {children}
      </section>
    </article>
  )
}

export default MdxGalleryImage