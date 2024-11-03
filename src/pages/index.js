import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p data-testid = "home-page">I'm making this by following the Gatsby Tutorial.</p>
      <p>ACTIONS TEST AGAIN.</p>
      <p>Atomic Workflow added.</p>

      <StaticImage
        alt="Katie, my dog"
        src="../images/Dawg.jpeg"
      />
    </Layout>
  )
}

export const Head = () => <Seo title="Home Page" />

export default IndexPage