import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialFormState = {
  email: "",
  password: "",
  error: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (formData.email.length === 0 || formData.password === 0) {
      return setFormData({
        ...formData,
        error: "Did you forget to type a field?",
      });
    } else if (formData.password.length < 7) {
      return setFormData({
        ...formData,
        error: "Password must be atleast 7 characters.",
      });
    }
    await axios
      .post("http://localhost:3001/user/login", formData)
      .then((res) => {
        console.log(res);
        setFormData(initialFormState);
        //redirect the user...
        //handle user state
      })
      .catch((err) =>
        setFormData({
          ...formData,
          error: err.response.data.error || err.name,
        })
      );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full items-center h-screen ">
      <h1 className="block w-full text-center mb-6">
        Login to your account
      </h1>
      <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
        <form
          className="mb-4 md:flex md:flex-wrap md:justify-between"
          onSubmit={handleSubmitForm}
        >
          <div className="flex flex-col mb-4 md:w-full">
            <label
              htmlFor="email"
              className="mb-2 tracking-wide font-bold text-lg py-2 px-3"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              className="border py-2 px-3 "
              autoComplete="user"
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
            <input
              type="password"
              name="password"
              className="border py-2 px-3"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button className="block bg-slate-500 text-white hover:bg-slate-700 uppercase p-4 mx-auto rounded">
            Submit
          </button>
          <div>{formData.error && formData.error}</div>
        </form>
        <span className="block w-full text-center no-underline hover:slate-300 text-sm">
          <Link to="/register" className="hover:blue">
            Need an account??
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
