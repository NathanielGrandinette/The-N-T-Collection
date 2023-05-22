import axios from "axios";

const verifyToken = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return token ? token : "";
};

const instance = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    "x-access-token": verifyToken(),
    "Content-Type": "multipart/form-data",
  },
});

export default instance;
