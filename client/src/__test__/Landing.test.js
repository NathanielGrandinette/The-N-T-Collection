import { render, screen } from '@testing-library/react'
import Landing from '../pages/Landing/Landing'
import { BrowserRouter } from 'react-router-dom'

const MockRouter = () => {
    return (
        <BrowserRouter>
            <Landing />
        </BrowserRouter>
    )
}

const renderLanding = () => {
    return (
        render(<MockRouter />)
    )
}

describe("Shop", () => {
    it("Should render company logo", async () => {
        renderLanding()
        const imageElement = screen.getByAltText("company logo")
        expect(imageElement).toBeInTheDocument()
    })

    it("Should render get started button", async () => {
        renderLanding()
        const buttonElement = screen.getByRole("button", { name: "Get Started!" })
        expect(buttonElement).toBeInTheDocument()
    })

    it("Should render landing page", async () => {
        renderLanding()
        const landingElement = screen.getByTestId("landing-section")
        expect(landingElement).toHaveClass("flex flex-col h-screen content-center justify-center flex-wrap")
    })
})