import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { ProvideAuth } from '../../context/AuthContext';
import Login from './Login';

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

  test('submits the login form with valid credentials', async () => {
    // Mock the successful login response
    const mockResponse = {
      data: {
        user: { email: 'admin@gmail.com', password: "admintest" },
      },
    };
    axios.post.mockResolvedValue(mockResponse);

    // Fill in the form inputs
    const emailInput = screen.getByLabelText('Email:');
    const passwordInput = screen.getByLabelText('Password:');
    fireEvent.change(emailInput, { target: { value: 'admin@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'admintest' } });

    // Submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check if the login request is made
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3001/user/login',
      { email: 'test@example.com', password: 'password' }
    );

    // Check if the user is redirected to the "/shop" page
    await waitFor(() => {
      expect(window.location.pathname).toBe('/shop');
    });
  });
  // Write more integration tests for different scenarios and edge cases
});