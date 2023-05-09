import axios from "axios";
import { useState } from "react";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setFormData({
        ...formData,
        error: "Passwords must match",
      });
    } else if (
      formData.password.length < 7 ||
      formData.confirmPassword.length < 7
    ) {
      return setFormData({
        ...formData,
        error: "Password must be atleast 7 characters.",
      });
    }
    await axios
      .post("http://localhost:3001/user/register", formData)
      .then((res) => {
        console.log(res);
        setFormData(initialFormState);
        //redirect the user...
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
    <div className="w-full flex flex-col">
      <form className="space-y-4" onSubmit={handleSubmitForm}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          autoComplete="user"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <label htmlFor="confirmPassword">confirm password:</label>
        <input
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <button className="btn">Submit</button>
        <div>{formData.error && formData.error}</div>
      </form>
    </div>
  );
};

export default Register;
