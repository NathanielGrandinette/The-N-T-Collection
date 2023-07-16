import axios from "axios";

const verifyToken = () => {
  const token = JSON.parse(localStorage.getItem("jwt"));
  return token ? token : "";
};

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BASE_URL ||
    "https://the-n-t-collection-server.vercel.app/",
  timeout: 2 * 60 * 1000,
});

instance.interceptors.request.use((config) => {
  config.headers["x-access-token"] = verifyToken();
  config.headers["Content-Type"] = "multipart/form-data";

  return config;
});

export default instance;
