import * as React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const ArticlePage = ({data}) => {
    const titles = data.Drupal.nodeArticles.nodes;

  return (
    <Layout pageTitle="Article Page">
      <p>All Articles.</p>
      <ul>
        {titles.map((articles, index) => (
          <li key={index}>
            <Link to= {`/article/${articles.id}`}>{articles.title} </Link>
            </li>
        ))}
      </ul>
    </Layout>
  )
}
export const query = graphql`
query MyQuery {
    Drupal {
      nodeArticles(first: 100) {
        nodes {
          id
          title
          path
        }
      }
    }
  }
`

export const Head = () => <Seo title="Article Page" />

export default ArticlePage