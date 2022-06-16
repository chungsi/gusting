import { graphql } from 'gatsby'

export const query = graphql`
  fragment ProjectMdxFrontmatterGallery on Mdx {
    frontmatter {
      gallery {
        publicURL
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
`