import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductCards from "./components/ProductCards/ProductCards";
import Login from "./pages/Login/Login";
import Users from "./components/Users/Users";
import Landing from "./pages/Landing/Landing";
import Shop from "./pages/Shop/Shop";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/shop" element={<Shop />} />
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
