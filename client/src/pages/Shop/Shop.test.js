import { render, screen } from '@testing-library/react'
import Shop from './Shop'
import { BrowserRouter } from 'react-router-dom'

const MockRouter = () => {
    return (
        <BrowserRouter>
            <Shop />
        </BrowserRouter>
    )
}

describe("Shop", () => {
    it("Should display products", async () => {
    })
})