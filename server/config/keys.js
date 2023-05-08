module.exports = {
    app: {
        name: "The-N-T-Collection",
        apiEndpoint: process.env.API_ENDPOINT ? `/${process.env.API_ENDPOINT}` : "/api",
    },
    database: {
        url: process.env.MONGODB_STRING
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: "7d",
    }
}
