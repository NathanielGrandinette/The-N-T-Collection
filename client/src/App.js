import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ProductList from './components/Products/ProductList'
import ProductDetail from "./components/Products/ProductDetail";
import ProductCards from "./components/Products/ProductCards";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/productlist' element={<ProductList />} />
        <Route path='/productdetail' element={<ProductDetail />} />
        <Route path='/productcard' element={<ProductCards />} />
      </Routes>
    </div>
  );
}

export default App;
