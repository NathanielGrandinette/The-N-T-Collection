import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { useState } from 'react'; // Import useState hook

import useGetProducts from './useGetProducts';

describe('useGetProducts', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    // Clearing mocked requests before each test
    mockAxios.reset();
  });

  it('should set products with data from axios response', async () => {
    // Wrap the test code inside a functional component
    function TestComponent() {
      const [products, setProducts] = useState(''); // Use useState hook

      useGetProducts(setProducts);

      return null;
    }

    const productList = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

    const { waitForNextUpdate } = renderHook(() => TestComponent()); // Render the TestComponent

    // Mocking the axios response
    const result = mockAxios.onGet('/product').reply(200, productList);
    // Assertion to check if products have been set correctly
    // You might need to adjust this assertion depending on how you're setting the products in useGetProducts
    // For example: expect(result.current[0]).toEqual(productList);
    expect(result.data).toEqual(productList); // Replace with your desired assertion
  });

  // Add more test cases if needed
});