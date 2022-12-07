module.exports = app => {

    const productsRoutes = require("./products.routes")
    app.use("/api/products", productsRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/api/auth", authRoutes)

    const uploadRoutes = require("./upload.routes")
    app.use("/api/upload", uploadRoutes)

}
