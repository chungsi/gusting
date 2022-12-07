import { title } from 'process'
import * as React from 'react'
import { concat } from '../utils/helpers'

type ProjectExcerptProps = {
  frontmatter: {
    title: string
    subtitle: string | null
    tags: readonly (string | null)[] | null
  }
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  oneLineTags?: boolean
}

const ProjectExcerpt = ({
  frontmatter: {
    title,
    subtitle,
    tags
  },
  h1, h2, h3, h4, h5, h6,
  oneLineTags
}: ProjectExcerptProps) => {
  var HeaderTag: keyof JSX.IntrinsicElements = 'h3'

  if (h1) HeaderTag = 'h1'
  else if (h2) HeaderTag = 'h2'
  else if (h3) HeaderTag = 'h3'
  else if (h4) HeaderTag = 'h4'
  else if (h5) HeaderTag = 'h5'
  else if (h6) HeaderTag = 'h6'

  return (
    <>
      {/*
        These slots ( {title}, {subtitle} ) can be passed a JSX object,
        so could come without the wrapping tags which lets individual
        calls to define their own HTML tags and classes...
        Would that be useful for me at this point?
        */}
      <HeaderTag className={concat(
          'relative text-xl m-0',
          // '[text-decoration:wavy_underline_transparent] transition-colors',
          // 'group-hover:[text-decoration:wavy_underline_var(--primary-color)]'
        )}
      >
        {/* <span
          aria-hidden
          content={title}
          className={concat(
            'after:content-[attr(content)]',
            'absolute w-full h-full top-0 left-0',
            '[text-decoration:wavy_underline_transparent]',
            'group-hover:decoration-[color:var(--primary-color)]'
          )} /> */}
        {title}
      </HeaderTag>

      {subtitle &&
        <p className={concat(
        'italic font-light leading-snug',
        'mx-0 mt-2xs mb-md'
        )}>
          {subtitle}
        </p>
      }

      {tags &&
        <ul className='text-sm list-none p-0'>
          {tags.map((tag, i) => (
            <li key={i} className={oneLineTags ? `inline-block pr-2` : ''}>
              {tag}
              {/* Print a forward-slash after the text if it's not last */}
              {(i+1)<tags.length ? ' /' : ''}
            </li>
          ))}
        </ul>
      }
    </>
  )
}

export default ProjectExcerpt