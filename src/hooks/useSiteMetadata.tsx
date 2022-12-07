import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<Queries.SiteMetadataQuery>(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            description
            siteUrl
            homeUrlParamName
            artHome {
              title
              subtitle
              homeUrlParam
              metaTitle
              # metaDescription
            }
            designHome {
              title
              subtitle
              homeUrlParam
              metaTitle
              # metaDescription
            }
          }
        }
      }
    `
  )
  return site?.siteMetadata
}