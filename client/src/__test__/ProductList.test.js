import {
  screen,
  render,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { AuthContext, ProvideAuth } from "../context/AuthContext";
import ProductList from "../components/ProductList/ProductList";
import { CartProvider } from "../context/CartContex";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import React from "react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

//mock user
const user = {
  name: "Admin",
  _id: "6486867562d2a2fb9bf743b8",
};

const renderProductList = () => {
  return render(
    <ErrorBoundary>
      <BrowserRouter>
        <ProvideAuth user={user}>
          <CartProvider>
            <ProductList />
          </CartProvider>
        </ProvideAuth>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

test("it should render the search products input", async () => {
  renderProductList();

  const searchInput = screen.getByRole("textbox");

  await waitFor(() => {
    expect(searchInput).toBeInTheDocument();
  });
});

test("it should contain a select with 10 category values", async () => {
  renderProductList();

  // screen.logTestingPlaygroundURL(); commented out. This is to get link for the testing playground.

  //Grab Elements////////////

  const select = screen.getAllByRole("option");

  const electronics = screen.getByRole("option", {
    name: /electronics/i,
  });
  const toys = screen.getByRole("option", {
    name: /toys/i,
  });
  const automotive = screen.getByRole("option", {
    name: /automotive/i,
  });

  const pets = screen.getByRole("option", {
    name: /pets/i,
  });
  const healthAndBeauty = screen.getByRole("option", {
    name: /health and beauty/i,
  });
  const clothing = screen.getByRole("option", {
    name: /clothing/i,
  });

  const jewelry = screen.getByRole("option", {
    name: /jewelry/i,
  });
  const genHouseHold = screen.getByRole("option", {
    name: /general household/i,
  });
  const other = screen.getByRole("option", {
    name: /other/i,
  });
  const selectCat = screen.getByRole("option", {
    name: /--Select Category--/i,
  });
  ////////////////////////////////////////

  //Assertions
  expect(electronics).toHaveValue("Electronics");
  expect(toys).toHaveValue("Toys");
  expect(automotive).toHaveValue("Automotive");
  expect(pets).toHaveValue("Pets");
  expect(healthAndBeauty).toHaveValue("Health and Beauty");
  expect(clothing).toHaveValue("Clothing");
  expect(jewelry).toHaveValue("Jewelry");
  expect(genHouseHold).toHaveValue("General Household");
  expect(other).toHaveValue("Other");
  expect(selectCat).toHaveValue("");

  expect(select).toHaveLength(10);
});

it("searches a product by name", async () => {
  renderProductList();

  const searchInput = screen.getByPlaceholderText("Search Products");

  fireEvent.change(searchInput, {
    target: { value: "Playstation 5" },
  });

  await waitFor(() => {
    expect(screen.getByText("Playstation 5")).toBeInTheDocument();
  });
});

it("filters products by category", async () => {
  renderProductList();
  const select = screen.getByRole("option", {
    name: /--Select Category--/i,
  });
  fireEvent.change(select, { target: { value: "Toys" } });

  await waitFor(() => {
    expect(screen.getByText("Charmander Plush")).toBeInTheDocument();
  });
});

it("should return no results found on random search", async () => {
  renderProductList();

  const searchInput = screen.getByPlaceholderText("Search Products");

  fireEvent.change(searchInput, {
    target: { value: "dfsgsdfgsfgsd" },
  });

  await waitFor(() => {
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });
});
