import { render, screen } from '@testing-library/react';
import App from './App';
import ProductList from './components/Products/ProductList';

test('renders learn react link', () => {
  it("Should display product cards")
  render(<ProductList />);
  const productHeader = screen.getByText(/Products/i);
  expect(productHeader).toBeInTheDocument();
});
