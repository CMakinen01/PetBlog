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
            path
          }
        }
      }
    }
  `)
  const resultArticle = await graphql(`
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
  `)

  const Template = path.resolve('src/templates/template.js')
  const ArticleTemplate = path.resolve('src/templates/articles-template.js')

  resultArticle.data.Drupal.nodeArticles.nodes.forEach(article => {
    console.log("Creating page for article:", article.id);

    createPage({
        path: `/article/${article.id}`,
        component: ArticleTemplate,
        context: {
            articlePath: article.id,
        },
    })
  })
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