import { createContext, useState } from "react"
import productsService from "../services/products.service"

const ProductContext = createContext()

function ProductProviderWrapper(props) {

    const [allProducts, setAllProducts] = useState()
    const [favProducts, setFavProducts] = useState()
    const [userProducts, setUserProducts] = useState()

    const getUserProducts = () => {

        productsService
            .getUserProducts()
            .then(({ data }) => setUserProducts(data))
            .catch(err => console.log(err))
    }

    const getUserFavs = () => {

        productsService
            .getLikedProduct()
            .then(({ data }) => setFavProducts(data))
            .catch(err => console.log(err))
    }

    const getAllProducts = () => {

        productsService
            .getProducts()
            .then(({ data }) => setAllProducts(data))
            .catch(err => console.log(err))
    }

    const refreshAll = () => {
        getUserProducts()
        getUserFavs()
        getAllProducts()
    }


    return (
        <ProductContext.Provider value={{ refreshAll, allProducts, favProducts, userProducts }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProviderWrapper }
