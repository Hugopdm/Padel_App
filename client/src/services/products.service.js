import axios from 'axios'

class ProductService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/products`
        })
    }


    getProducts() {
        return this.api.get('/getAllProducts')
    }

    getOneProduct(product_id) {
        return this.api.get(`/getOneProduct/${product_id}`)
    }

    saveProduct(productData) {
        return this.api.get('/saveProduct', productData)
    }

}

const productService = new ProductService()

export default ProductService