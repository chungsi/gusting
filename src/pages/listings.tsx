import * as React from 'react'
import { Link, graphql, PageProps } from 'gatsby'

import Layout from '../components/Layout'

const ListingsPage = ({
  data: { allFile }
}: PageProps<{ allFile: Queries.ListingsPageQuery["allFile"] }>) => {

  return (
    <Layout>
      <h1>All of the Things</h1>
      {
        allFile.group.map(group =>
          <>
            <h2 className="mono" key={group.fieldValue}>{group.fieldValue}</h2>
            {group.nodes.map(node =>
              <article key={node?.childMdx?.id}>
                <h4>
                  <Link to={`/${group.fieldValue}/${node?.childMdx?.slug}`}>
                    {node?.childMdx?.frontmatter?.title}
                  </Link>
                </h4>
              </article>
            )}
          </>
        )
      }
    </Layout>
  )
}

export const query = graphql`
  query ListingsPage {
    allFile(filter: {extension: {eq: "mdx"}}) {
      group(field: sourceInstanceName) {
        fieldValue
        nodes {
          childMdx {
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
            slug
            id
          }
        }
      }
    }
  }
`

export default ListingsPage