import { useState, React } from "react";
import axios from "axios";
import TogglePasswordIcon from "../../components/TooglePasswordIcon";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return setFormData({
        ...formData,
        error: "Passwords must match",
      });
    } else if (
      formData.password.length < 7 ||
      formData.confirmPassword.length < 7
    ) {
      setLoading(false);
      return setFormData({
        ...formData,
        error: "Password must be atleast 7 characters.",
      });
    } else if (!formData.name || !formData.email) {
      setLoading(false);
      return setFormData({
        ...formData,
        error: "Please enter a Name/Email",
      });
    }

    setTimeout(async () => {
      await axios
        .post("/user/register", formData)
        .then((res) => {
          console.log(res);
          setFormData(initialFormState);
          setLoading(false);
          navigate("/login", { replace: true }); //receive token  from login
        })
        .catch((err) => {
          console.log(err);
          setFormData({
            ...formData,
            error:
              err.response?.data.error || err?.name || err?.error,
          });
          setLoading(false);
        });
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
          Register
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
              htmlFor="name"
              className="mb-2 tracking-wide font-bold text-lg"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="border py-2 px-3 "
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
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
                data-testid="password1"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                className="border py-2 px-3 pr-10 w-full"
                autoComplete="new-password"
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
          <div className="flex flex-col mb-4 md:w-full">
            <label
              htmlFor="confirmPassword"
              className="mb-2 tracking-wide font-bold text-lg"
            >
              Confirm Password:
            </label>
            <div className="password-input">
              <input
                id="confirmPassword"
                data-testid="password-input"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="border py-2 px-3 pr-10 w-full"
                autoComplete="new-password"
                value={formData.confirmPassword}
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

        <span className="block w-full text-center no-underline hover:slate-300 text-sm">
          <Link to="/login" className="hover:blue">
            Already have an account?
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
