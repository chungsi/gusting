import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { GatsbyImage, getSrc, StaticImage } from 'gatsby-plugin-image'
import ContentLayout from '../components/ContentLayout'
import ProjectHeader from '../components/projectHeader'
import ProjectPagination from '../components/projectPagination'
import MdxImage from '../components/mdxImage'

const ProjectPost = ({data, pageContext}) => {
  const headerBlock = (
    <>
      <ProjectHeader
          title={data.mdx.frontmatter.title}
          subtitle={data.mdx.frontmatter.subtitle}
          category={data.mdx.frontmatter.category}
          heroImgSrc={getSrc(data.mdx.frontmatter.hero_image)} />
    {/* insert category info for svg shapey */}
    </>
  )

  return (
    <ContentLayout
      className={data.mdx.frontmatter.category}
      header={headerBlock}
    >
      {/* <GatsbyImage
        image={getImage(data.mdx.frontmatter.hero_image)}
        alt={data.mdx.frontmatter.hero_image_alt}
      /> */}

      {/* Do I want to automatically parse h1's as h2's etc in the mdx??? */}
      <MDXProvider components={{
        MdxImage,
        StaticImage
      }}>
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </MDXProvider>

      <hr />
      <ProjectPagination
        pathPrefix='project'
        next={pageContext.next}
        prev={pageContext.prev} />

    </ContentLayout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        subtitle
        category
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      body
    }
  }
`

export default ProjectPost