import React from "react"
import { render } from "@testing-library/react"
import IndexPage from '../src/pages/index'

const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>

//render children to avoid site.metadata error in npm test
jest.mock('../src/components/layout', () => {
    return function MockLayout({ children }) {
      return <div>{children}</div> 
    }
  })

//Gatsby test from tutorial
test("Displays the correct title", () => {
  const { getByTestId } = render(<Title />)
  // Assertion
  expect(getByTestId("hero-title")).toHaveTextContent("Gatsby is awesome!")
})

//Test for static component
test("Page Title", () => {
    const { getByTestId } = render(<IndexPage />)
    expect(getByTestId("home-page")).toHaveTextContent("I'm making this by following the Gatsby Tutorial.")
  })


