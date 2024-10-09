import * as React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const RecipePage = ({data}) => {
  return (
    <Layout pageTitle="Recipe Page">
      <p>All Recipe Titles.</p>
      <ul>
        {data.Drupal.nodeRecipes.nodes.map((recipes) => (
          <li key={recipes.id}>
            <Link to= {`/recipe/${recipes.id}`}>{recipes.title} </Link>
            </li>
        ))}
      </ul>
    </Layout>
  )
}
export const query = graphql`
  query MyQuery {
    Drupal {
      nodeRecipes(first: 100) {
        nodes {
          id
          title
          path
        }
      }
    }
  }
`

export const Head = () => <Seo title="Recipe Page" />

export default RecipePage