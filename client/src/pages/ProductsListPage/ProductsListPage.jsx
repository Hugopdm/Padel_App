import './ProductsListPage.css'

import { useState, useEffect } from 'react'
import productsService from '../../services/products.service'
import ProductsList from '../../components/ProductsList/ProductsList'
import Loader from '../../components/Loader/Loader'
import { Container } from 'react-bootstrap'
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter'


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
        <>
            <div>
                <Container className=' mt-5'>

                    <ProductsFilter setProducts={setProducts} />
                </Container>
                <hr />
                <Container className='d-grid mb-5'>
                    <h1 className='text-center'>Nuestros Productos</h1>
                    <hr />
                    {!products ? <Loader /> : <ProductsList products={products} refreshProducts={getTheProducts} />}
                </Container>
            </div>
        </>
    )
}

export default ProductsListPage