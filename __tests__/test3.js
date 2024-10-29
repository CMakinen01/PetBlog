import React from "react"
import { render } from "@testing-library/react"
import ArticleTemplate from '../src/templates/articles-template';


const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

//render children to avoid site.metadata error in npm test
jest.mock('../src/components/layout', () => {
    return function MockLayout({ children }) {
      return <div>{children}</div> 
    }
  })

  const mockArticleData = {
    Drupal: {
      nodeArticle: {
        id: "0b9a1b2e-71ad-44f1-a695-aa34e073700e",
        path: "/en/articles/give-it-a-go-and-grow-your-own-herbs",
        author: {
          displayName: "Holly Foat"
        },
        body: {
          processed: "<p>There's nothing like having your own supply of fresh herbs, readily available and close at hand to use while cooking.</p>"
        },
        created: "2022-10-05T10:46:12-0700",
        title: "Test",
        mediaImage: {
          mediaImage: {
            url: "http://csc496f24demo.tldr.dev/sites/default/files/home-grown-herbs.jpg"
          }
        }
      }
    }
  };



//test for data-driven component collection
test("displays the article title, author, and content", () => {
    const { getByText, getByAltText } = render(
      <ArticleTemplate data={mockArticleData} pageContext={{}} />
    );
  
    //Assertations
    expect(getByText("Test")).toBeInTheDocument();
    expect(getByText("Author: Holly Foat")).toBeInTheDocument();
    expect(getByText("There's nothing like having your own supply of fresh herbs, readily available and close at hand to use while cooking.")).toBeInTheDocument();
    
    //Image
    expect(getByAltText('Test')).toHaveAttribute('src', 'http://csc496f24demo.tldr.dev/sites/default/files/home-grown-herbs.jpg');
  });