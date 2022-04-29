import * as React from "react"
import Layout from '../components/Layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout>
      <p>Woo template made!!!</p>
      <StaticImage
        alt="Clifford!"
        src="../images/art_trade_jari.png"
      />
    </Layout>
  )
}

export default IndexPage