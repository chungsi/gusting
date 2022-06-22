import * as React from 'react'

import { Link } from 'gatsby'
import { concat } from '../utils/helpers'

export type TableOfContents = {
  url: string
  title: string
  items?: TableOfContents[] | null | undefined
}

type ProjectTocProps = {
  content: TableOfContents[]
  maxDepth?: number
  className?: string
}

const ProjectToc = ({
  content,
  maxDepth,
  className
}: ProjectTocProps) => {

  return (
    <menu className={concat(
      'pl-2 pr-4 border-l text-sm',
      className ?? '')
    }>
      {/* <span aria-hidden className='bg-white opacity-80 absolute w-full h-full top-0 left-0 -z-[2]' /> */}

      {printOutItems({
        items:content,
        maxDepth
      })}

    </menu>
  )
}

const printOutItems = ({
  items,
  maxDepth = 9,
  currentDepth = 1
}: {
  items: TableOfContents[]
  maxDepth?: number
  currentDepth?: number
}) => {
  var menuItems: JSX.Element[] = []
  const nextDepth = currentDepth + 1

  items.forEach((item, i) => {
    menuItems.push(
      <li
        key={i}
        className={concat(
          '[--bg-rotate:-1.5deg] even:[--bg-rotate:2deg] third:[--bg-rotate:-5deg]',
          currentDepth == 1 ? 'my-2' : '',
        )}
      >
        <>
          <Link
            to={item.url}
            className={concat(
              'relative inline-block group px-3 py-[.125rem]',
              currentDepth == 1 ? 'font-extrabold' : '',
            )}
          >
            {item.title}

            {/* Hover bg style */}
            <span className={concat(
              'absolute block top-0 left-0 w-full h-full -z-[1]',
              'group-hover:bg-th-highlight rotate-[length:var(--bg-rotate)]'
            )} />

          </Link>

          {item.items && maxDepth >= nextDepth &&
            <ul className='ml-4'>
              {printOutItems({
                items: item.items,
                maxDepth,
                currentDepth: nextDepth
              })}
            </ul>
          }
        </>
      </li>
    )
  })

  return menuItems
}

export default ProjectToc