import * as React from 'react'

import { Link } from 'gatsby'
import { concat } from '../utils/helpers'

type TableOfContents = {
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

  console.log('testing project toc data structure', content)

  return (
    <menu className={concat(
      'px-4 border-l',
      className ?? '')
    }>
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
        className='my-1'
      >
        <>
          <Link to={item.url}>{item.title}</Link>
          {item.items && maxDepth >= nextDepth &&
            <ul className='pl-4'>
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