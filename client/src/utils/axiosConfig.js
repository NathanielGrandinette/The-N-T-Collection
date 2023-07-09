import axios from "axios";

const verifyToken = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return token ? token : "";
};

const instance = axios.create({
  baseURL: "https://the-n-t-collection-server.vercel.app/",
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  config.headers["x-access-token"] = verifyToken();
  config.headers["Content-Type"] = "application/json";

  return config;
});

export default instance;
