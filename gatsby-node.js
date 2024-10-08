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
  const resultArticle = await graphql(`
  query MyQuery {
    Drupal {
      nodeArticles(first: 100) {
        nodes {
          id
          title
        }
      }
    }
  }
  `)

  const Template = path.resolve('src/pages/template.js')
  const ArticleTemplate = path.resolve('src/pages/articles-template.js')

  resultArticle.data.Drupal.nodeArticles.nodes.forEach(article => {
    createPage({
        path: `/article/${article.id}`,
        component: ArticleTemplate,
        context: {
            articleId: article.id,
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