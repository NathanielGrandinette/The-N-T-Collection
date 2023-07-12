import axios from "../../utils/axiosConfig";
import { useState, React, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import TogglePasswordIcon from "../../components/TooglePasswordIcon";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./Login.css";

const initialFormState = {
  email: "",
  password: "",
  error: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.email.length === 0 || formData.password === 0) {
      return (
        setFormData({
          ...formData,
          error: "Please enter Email and Password.",
        }),
        setLoading(false)
      );
    } else if (formData.password.length < 7) {
      return (
        setFormData({
          ...formData,
          error: "Password must be at least 7 characters.",
        }),
        setLoading(false)
      );
    }
    setTimeout(async () => {
      await axios
        .post("/user/login", formData)
        .then((res) => {
          setFormData(initialFormState);
          localStorage.setItem(
            "jwt",
            JSON.stringify(res.data?.token)
          );
          localStorage.setItem(
            "n-t-user",
            JSON.stringify(res.data?.user)
          );
          setUser(res.data?.user);
          navigate("/shop", { replace: true });
        })
        .catch((err) => {
          setFormData({
            ...formData,
            error: err.response.data.error || err.name,
          });
          setLoading(false);
        });
      setLoading(false);
    }, 1000);
  };

  const testLogin = () => {
    setLoading(true);
    setTimeout(async () => {
      await axios
        .post("/user/login", {
          email: "test@test.com",
          password: "test1234",
        })
        .then((res) => {
          localStorage.setItem(
            "jwt",
            JSON.stringify(res.data?.token)
          );
          localStorage.setItem(
            "n-t-user",
            JSON.stringify(res.data?.user)
          );
          setUser(res.data?.user);
          navigate("/shop", { replace: true });
        })
        .catch((err) =>
          setFormData({
            ...formData,
            error: err.response.data.error || err.name,
          })
        );
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full items-center h-screen ">
      <div
        data-testid="login-form"
        className="login-card md:w-full  bg-[#FDF3E7] rounded shadow-lg mt-10 p-8 m-4 md:max-w-sm md:mx-auto"
      >
        <h1 className="block w-full  text-4xl  text-center mb-6 text-[#36454F] ">
          Welcome Back!
        </h1>
        <h2 className="text-center text-gray-600">
          Please enter your details
        </h2>
        <form
          className="mb-4 shadow:lg md:justify-between login-form"
          onSubmit={handleSubmitForm}
        >
          <div className="flex flex-col mb-4 md:w-full">
            <label
              htmlFor="email"
              className="mb-2 tracking-wide font-bold text-lg"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              data-testid="email-input"
              className="border py-2 px-3 "
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col mb-4 md:w-full">
            <label
              htmlFor="password"
              className="mb-2 tracking-wide font-bold text-lg"
            >
              Password:
            </label>
            <div className="password-input">
              <input
                id="password"
                data-testid="password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                className="border py-2 px-3 pr-10 w-full"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span
                className={`hide-password relative m-0 top-1/2 transform cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <TogglePasswordIcon showPassword={showPassword} />
              </span>
            </div>
          </div>
          {loading ? (
            <button className="block bg-slate-500 text-white hover:bg-slate-700 uppercase p-4 mx-auto rounded">
              <LoadingSpinner />
            </button>
          ) : (
            <button className="block bg-slate-500 text-white hover:bg-slate-700 uppercase p-4 mx-auto rounded">
              Submit
            </button>
          )}
          <div className="text-red-500 text-center ml-5 mt-2">
            {formData.error && formData.error}
          </div>
        </form>
        {loading ? (
          ""
        ) : (
          <button
            onClick={() => testLogin()}
            className="block bg-slate-500 text-white hover:bg-slate-700 uppercase p-4 mx-auto rounded"
          >
            Test Login
          </button>
        )}
        <span className="block w-full text-center no-underline hover:slate-300 text-sm">
          <Link to="/register" className="hover:blue">
            Need an account?
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
