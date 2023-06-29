import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from '../context/AuthContext';
import Login from '../pages/Login/Login';

jest.mock('axios');

const RenderLogin = () => {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </ProvideAuth>


  )
}

describe('Login Component', () => {
  beforeEach(() => {
    render(<RenderLogin />);
  });

  test('renders the login form', () => {
    // Check if the login form is rendered
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });

  test("Renders welcome back header", () => {
    const welcomeHeader = screen.getByText("Welcome Back!")
    expect(welcomeHeader).toBeInTheDocument()
  })

  test("Renders second login form header", () => {
    const detailsHeader = screen.getByText("Please enter your details")
    expect(detailsHeader).toBeInTheDocument()
  })

  test("Renders email && password input", () => {
    const emailInput = screen.getByTestId("email-input")
    const passwordInput = screen.getByTestId("password-input")
    expect(emailInput && passwordInput).toBeInTheDocument()
  })

  test("Renders submit and test login button", () => {
    const submitButton = screen.getAllByRole("button")
    expect(submitButton.length).toBe(2)
  })

  test("Renders need an account link", () => {
    const accountLink = screen.getByText("Need an account?")
    expect(accountLink).toBeInTheDocument()
  })
});