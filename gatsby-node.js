const path = require('path')

exports.createPages = async ({graphql, actions}) => {

    const {createPage} = actions

    const result = await graphql(`
    query {
      Drupal {
        nodeRecipes(first: 100) {
          nodes {
            title
            id
          }
        }
      }
    }
  `)

  const Template = path.resolve('src/pages/template.js')

  result.data.Drupal.nodeRecipes.nodes.forEach(recipe => {
    createPage({
      path: `/recipe/${recipe.id}`,
      component: Template,
      context: {
        recipeId: recipe.id,
      },
    })
  })

}