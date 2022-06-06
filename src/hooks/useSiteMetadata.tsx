import { useStaticQuery, graphql } from 'gatsby'
import { SiteMetadataQuery } from '../@types/graphql-generated-types'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetadataQuery>(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            subtitle
            homeUrlParamName
            artHome {
              title
              subtitle
              homeUrlParam
              metaTitle
              metaDescription
            }
            designHome {
              title
              subtitle
              homeUrlParam
              metaTitle
              metaDescription
            }
            socials {
              twitter
              instagram
            }
          }
        }
      }
    `
  )
  return site?.siteMetadata
}