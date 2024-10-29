import React from "react"
import { render } from "@testing-library/react"
import Template from '../src/templates/template';

//render children to avoid site.metadata error in npm test
jest.mock('../src/components/layout', () => {
    return function MockLayout({ children }) {
      return <div>{children}</div> 
    }
  })




//test for data-driven component
const graphQLMock = {
    Drupal: {
        nodeRecipe: {
            title: "Mock Recipe",
            ingredients: ["1 onion", "2 garlic cloves", "1 pinch sugar"],
            mediaImage: {
                mediaImage: {
                    url: "http://url.com/pasta.jpg"
                }
            },
            recipeInstruction: {
                processed: "<p>Instructions to make pasta.</p>"
            },
            cookingTime: "20",
            difficulty: "easy",
            preparationTime: "5",
            numberOfServings: 4,
        }
    }
};

test("Displays the recipe ingredients", () => {
    const { getByText } = render(<Template data={graphQLMock} pageContext={{}} />);
    expect(getByText("Ingredients")).toBeInTheDocument();
    expect(getByText("1 onion")).toBeInTheDocument();
    expect(getByText("2 garlic cloves")).toBeInTheDocument();
    expect(getByText("1 pinch sugar")).toBeInTheDocument();
});