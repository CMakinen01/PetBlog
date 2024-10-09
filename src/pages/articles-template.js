import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

const ArticleTemplate = ({ data }) => {
  const article = data.Drupal.nodeArticle;

  return (
    <Layout pageTitle={article.title}>
      {article.mediaImage?.mediaImage?.url && (
        <img src={article.mediaImage.mediaImage.url} alt={article.title} style={{ maxWidth: '100%' }} />
      )}

      <h3>Author: {article.author?.displayName}</h3>
      <p>Published on: {new Date(article.created).toLocaleDateString()}</p>

      <h3>Content</h3>
      <div dangerouslySetInnerHTML={{ __html: article.body?.processed }} />

      
      
    </Layout>
  );
};

export const query = graphql`
query($articlePath: ID!) {   
     Drupal {
      nodeArticle(id: $articlePath) {
        id
        path
        author {
          displayName
        }
        body {
          processed
        }
        created
        title
        mediaImage {
          mediaImage {
            url
          }
        }
      }
    }
  }
`;

export default ArticleTemplate;
