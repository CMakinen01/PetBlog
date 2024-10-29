import React from 'react';
import Layout from '../components/layout';
import { graphql } from 'gatsby';

const ArticleTemplate = ({ data, pageContext }) => {
  const article = data.Drupal.nodeArticle;
  console.log("Page context:", pageContext); 
  console.log("Page data:", data); 


  return (
    <Layout>
      {article.mediaImage?.mediaImage?.url && (
        <img src={article.mediaImage.mediaImage.url} alt={article.title} style={{ maxWidth: '100%' }} />
      )}
      <h1>{article.title}</h1>

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
