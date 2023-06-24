import axios from "axios";

const verifyToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem("jwt"));
    console.log(token)
    return token ? token : "";
  } catch (error) {
    console.log(error);
  }
};

const instance = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    "x-access-token": verifyToken(),
    "Content-Type": "application/json",
  },
});

export default instance;
