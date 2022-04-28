import { graphql } from 'gatsby'

export const query = graphql`
  fragment ProjectMdxFrontmatter on Mdx {
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