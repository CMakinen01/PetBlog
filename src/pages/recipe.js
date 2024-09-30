import * as React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const RecipePage = ({data}) => {
    const titles = data.Drupal.nodeRecipes.nodes;

  return (
    <Layout pageTitle="Recipe Page">
      <p>All Recipe Titles.</p>
      <ul>
        {titles.map((recipe, index) => (
          <li key={index}>{recipe.title}</li>
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
          title
        }
      }
    }
  }
`

export const Head = () => <Seo title="Recipe Page" />

export default RecipePage