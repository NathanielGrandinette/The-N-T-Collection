import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductCards from "./components/ProductCards";
import Login from "./pages/Login";
import Users from "./components/Users/Users";
import Landing from "./pages/Landing";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/register" element={<Register />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route
          path="/productdetail/:productId"
          element={<ProductDetail />}
        />
        <Route path="/productcard" element={<ProductCards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
