import * as React from 'react'

const ProjectExcerpt = ( { frontmatter: { title, subtitle, tags } } ) => {

  return (
    <>
      {/*
        These slots ( {title}, {subtitle} ) can be passed a JSX object,
        so could come without the wrapping tags which lets individual
        calls to define their own HTML tags and classes...
        Would that be useful for me at this point?
        */}
      <h3 className='text-xl m-0
                      group-hover:[text-decoration:wavy_underline_var(--primary-color)]'>
        {title}
      </h3>
      <p className='italic [font-[length:var(--lght-wght)]]
                    mx-0 mt-2xs mb-md'>
        {subtitle}
      </p>
      {tags &&
        <ul className='text-sm list-none p-0'>
          {tags.map((tag, i) => (
            <li>
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