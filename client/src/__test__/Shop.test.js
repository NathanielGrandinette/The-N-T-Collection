import { render, screen } from '@testing-library/react'
import Shop from '../pages/Shop/Shop'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ContextWrapper = ({ children }) => {
    const user = {
        email: "admin@gmail.com",
        password: "admintest",
        role: "admin"
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

const RenderShop = () => {
    return (
        <BrowserRouter>
            <ContextWrapper>
                <Shop />
            </ContextWrapper>
        </BrowserRouter>
    )
}

describe("Shop", () => {
    beforeEach(() => {
        render(<RenderShop />)
    })
    it("Renders shop page", () => {
        const shopHeader = screen.getByText("Shop Products")
        expect(shopHeader).toBeInTheDocument()
    })
})