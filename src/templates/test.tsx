import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

type TestProps = {
  mdx: Queries.TestTemplateQuery["mdx"]
  children?: React.ReactNode | React.ReactNode[]
}

export default function TestTemplate ({
  data: { mdx },
  children
}: PageProps<TestProps>) {

  return (
    <>
      <h1>{mdx?.frontmatter?.title}</h1>
      <MDXProvider>{children}</MDXProvider>
    </>
  )
}

export const query = graphql`
  query TestTemplate ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
      }
    }
  }
`

// export default TestTemplate
