module.exports = app => {

    const productsRoutes = require("./products.routes")
    app.use("/api/products", productsRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

}
