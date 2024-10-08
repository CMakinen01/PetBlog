import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

const Template = ({ data }) => {
  const recipe = data.Drupal.nodeRecipe;

  return (
    <Layout pageTitle={recipe.title}>
      {recipe.mediaImage?.mediaImage?.url && (
        <img src={recipe.mediaImage.mediaImage.url} alt={recipe.title} style={{ maxWidth: '100%' }} />
      )}
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))
        ) : (
          <li>No ingredients found</li>
        )}
      </ul>

      <h3>Instructions</h3>
      <div dangerouslySetInnerHTML={{ __html: recipe.recipeInstruction?.processed }} />

      <p>Cooking Time: {recipe.cookingTime}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      <p>Preparation Time: {recipe.preparationTime}</p>
      <p>Number of Servings: {recipe.numberOfServings}</p>
    </Layout>
  );
};

export const query = graphql`
  query($recipeId: ID!) {
    Drupal {
      nodeRecipe(id: $recipeId) {
        title
        id
        difficulty
        cookingTime
        ingredients
        preparationTime
        recipeInstruction {
          processed
        }
        numberOfServings
        mediaImage {
          mediaImage {
            url
          }
        }
      }
    }
  }
`;

export default Template;
