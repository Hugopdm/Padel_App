import './ProductsListPage.css'

import { useState, useEffect } from 'react'
import productsService from '../../services/products.service'
import ProductsList from '../../components/ProductsList/ProductsList'
import { Container } from 'react-bootstrap'

const ProductsListPage = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        productsService
            .getProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <h1>Nuestros Productos</h1>
            <hr />
            {!products ? <h1>Esperando...</h1> : <ProductsList products={products} />}
        </Container>
    )
}

export default ProductsListPage