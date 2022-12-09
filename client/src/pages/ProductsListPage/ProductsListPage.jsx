import './ProductsListPage.css'

import { useState, useEffect } from 'react'
import productsService from '../../services/products.service'
import ProductsList from '../../components/ProductsList/ProductsList'
import Loader from '../../components/Loader/Loader'
import { Container } from 'react-bootstrap'

const ProductsListPage = () => {

    const [products, setProducts] = useState([])

    const getTheProducts = () => {
        productsService
            .getProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTheProducts()

    }, [])

    return (
        <Container>
            <h1>Nuestros Productos</h1>
            <hr />
            {!products ? <Loader /> : <ProductsList products={products} refreshProducts={getTheProducts} />}
        </Container>
    )
}

export default ProductsListPage