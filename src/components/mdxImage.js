import * as React from 'react'

const MdxImage = ({style, caption, children}) => {
  var classList = 'project-image'

  if (style) {
    var styleList = style.split(' ')
    styleList.forEach(spec => {
      switch (String(spec)) {
        case 'landscape':
          classList += ' landscape'
          break
        case 'cover':
          classList += ' cover'
          break
        default:
      }
    })
  }

  return (
    <>
      <div class={classList}>
        {children}
      </div>
      {caption &&
        <p>{caption}</p>
      }
    </>
  )
}

export default MdxImage