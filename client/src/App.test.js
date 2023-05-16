import { render, screen } from '@testing-library/react';
import App from './App';
import ProductList from './components/Products/ProductList';

test('renders learn react link', () => {
  render(<ProductList />);
  const productHeader = screen.getByText(/Products/);
  expect(productHeader).toBeInTheDocument();
});
