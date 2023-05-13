import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ProductList from "./components/Products/ProductList";
import ProductDetail from "./components/Products/ProductDetail";
import ProductCards from "./components/Products/ProductCards";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route
          path="/productdetail/:productId"
          element={<ProductDetail />}
        />
        <Route path="/productcard" element={<ProductCards />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
