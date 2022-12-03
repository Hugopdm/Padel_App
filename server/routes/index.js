module.exports = app => {
    const productsRoutes = require("./products.routes")
    app.use("/api/products", productsRoutes)
}
