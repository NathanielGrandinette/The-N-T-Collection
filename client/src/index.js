import React from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";
import App from "./App";
import { ProvideAuth } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./context/CartContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary fallback="There has been an error...">
    <CartProvider>
      <ProvideAuth>
        <BrowserRouter basename="/public/index.html">
          <App />
        </BrowserRouter>
      </ProvideAuth>
    </CartProvider>
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
