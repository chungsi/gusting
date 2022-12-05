import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'

type TestTemplateProps = {
  mdx: Queries.TestTemplateQuery["mdx"]
  children?: any
}

const TestTemplate = ({
  data: {mdx},
  children
}: PageProps<TestTemplateProps>) => {
  return (
    <MDXProvider>{children}</MDXProvider>
  )
}

export const query = graphql`
  query TestTemplate ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        subtitle
      }
    }
  }
`

export default TestTemplate