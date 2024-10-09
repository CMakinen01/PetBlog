import * as React from 'react'
import {graphql, Link} from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const RecipePage = ({data}) => {
    const titles = data.Drupal.nodeRecipes.nodes;

  return (
    <Layout pageTitle="Recipe Page">
      <p>All Recipe Titles.</p>
      <ul>
        {titles.map((recipes, index) => (
          <li key={index}>
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