import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import ProductCards from "./components/ProductCards/ProductCards";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Shop from "./pages/Shop/Shop";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Admin from "./pages/Admin/Admin";
import AdminRoutes from "./utils/PrivateRoutes/AdminRoutes";
import UserRoutes from "./utils/PrivateRoutes/UserRoutes";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useContext(AuthContext);

  const isLoggedIn = (user) => {
    return user ? true : false;
  };

  return (
    <div>
      <NavBar />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {}
        <Route
          path="/"
          element={isLoggedIn(user) ? <Shop /> : <Landing />}
        />
        <Route path="/login" element={<Login />} />
        <Route element={<UserRoutes />}>
          <Route element={<AdminRoutes />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/shop" element={<Shop />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/productdetail/:productId"
            element={<ProductDetail />}
          />
          <Route path="/productcard" element={<ProductCards />} />
        </Route>
      </Routes>

      {isLoggedIn(user) ? <Footer /> : null}
    </div>
  );
}

export default App;
