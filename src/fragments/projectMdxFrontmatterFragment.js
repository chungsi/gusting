import { graphql } from 'gatsby'

export const query = graphql`
  fragment ProjectMdxFrontmatterFragment on Mdx {
    frontmatter {
      title
      subtitle
      category
      tags
      heroImagePos
      heroImage {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`