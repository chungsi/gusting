import { graphql } from 'gatsby'

export const query = graphql`
  fragment ProjectMdxFrontmatter on Mdx {
    frontmatter {
      title
      subtitle
      description
      category
      tags
      metaImage {
        publicURL
        childImageSharp {
          gatsbyImageData
        }
      }
      heroImagePos
      heroImage {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`