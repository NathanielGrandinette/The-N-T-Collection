module.exports = {
  app: {
    name: "The-N-T-Collection",
    apiEndpoint: process.env.API_ENDPOINT
      ? `/${process.env.API_ENDPOINT}`
      : "/api",
  },
  database: {
    url: process.env.MONGODB_STRING,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: "7d",
  },
  node: {
    env: process.env.NODE_ENV,
  },
  cloudinary: {
    api_key: process.env.API_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.API_SECRET,
  },
};
