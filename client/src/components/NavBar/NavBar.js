import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import "./NavBar.css";
import logo from "../../assets/the N-T Collection.svg";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const hamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transporm duration-300`;

  const handleLogout = () => {
    localStorage.removeItem("n-t-user");
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/home");
  };

  /**
   * @param user - The "user" parameter is an object that represents a user in a system. It is used to
   * check if the user has the role of "admin" or not. The function returns true if the user has the
   * role of "admin" and false otherwise. The "?" operator is used to check if
   * @returns The function `isUserAdmin` takes in a `user` object as a parameter and checks if the
   * `role` property of the `user` object is equal to `"admin"`. If it is, the function returns `true`,
   * otherwise it returns `false`.
   */
  const isUserAdmin = (user) => {
    return user?.role === "admin" ? true : false;
  };

  /**
   * @param user - The "user" parameter is a variable that represents the user object or data that is
   * being checked for authentication. The function "isLoggedIn" checks if the user object is truthy
   * (i.e., not null, undefined, false, 0, or an empty string) and returns true if it is
   * @returns The function `isLoggedIn` takes in a parameter `user` and returns `true` if `user` is
   */
  const isLoggedIn = (user) => {
    return user ? true : false;
  };
  return (
    <div
      id="navigation"
      className="flex items-center justify-between lg:justify-around border-b border-blue-500 shadow-lg py-8 pb-0"
    >
      <Link to="/">
        <BsBag size={30} />
      </Link>
      <nav>
        <section className="mobile-menu flex lg:hidden">
          <button
            className="flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <div
              className={`${hamburgerLine} ${
                isNavOpen
                  ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${hamburgerLine} ${
                isNavOpen
                  ? "opacity-0"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${hamburgerLine} ${
                isNavOpen
                  ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
          </button>
          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <ul
              className="menu-link-mobile-open flex flex-col items-center   justify-between min-h-[250px]"
              onClick={() => setIsNavOpen(false)}
            >
              <Link to="/">
                <BsBag size={30} fill="white" />
              </Link>
              <li className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500">
                <Link to="/">Home</Link>
              </li>
              <li className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500">
                <Link to="/shop">Shop</Link>
              </li>
              {isUserAdmin(user) ? (
                <li>
                  {" "}
                  <Link
                    to="/users"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
                  >
                    Admin
                  </Link>
                </li>
              ) : null}
              {isLoggedIn(user) ? (
                <li>
                  <Link
                    onClick={handleLogout}
                    to="/"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </section>

        <ul className="desktop-menu-hidden hidden space-x-8 lg:flex text-lg">
          <li>
            <Link
              to="/"
              className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
            >
              Shop
            </Link>
          </li>

          {isUserAdmin(user) ? (
            <li>
              {" "}
              <Link
                to="/users"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
              >
                Admin
              </Link>
            </li>
          ) : null}

          {isLoggedIn(user) ? (
            <li>
              <Link
                onClick={handleLogout}
                to="/"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-teal-500 "
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

//   <nav className="bg-white border-b-2 border-blue-500 shadow-lg">
//       <div className="max-w-7xl mx-auto px-4">
//         <div>
//           <div className="flex space-x-4">
//             <div className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
//               <BsBag size={32} />
//             </div>
//             <div className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
//               <Link
//                 to="/home"
//                 className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/productlist"
//                 className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 "
//               >
//                 Shop
//               </Link>
//               <Link
//                 to="account"
//                 className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 "
//               >
//                 Account
//               </Link>
//               {!user ? (
//                 <div className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
//                   <Link
//                     to="/login"
//                     className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 "
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 "
//                   >
//                     Register
//                   </Link>
//                 </div>
//               ) : (
//                 <button
//                   className="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400 "
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
