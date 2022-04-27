import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
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
            }
            designHome {
              title
              subtitle
              homeUrlParam
            }
          }
        }
      }
    `
  )
  return site.siteMetadata
}