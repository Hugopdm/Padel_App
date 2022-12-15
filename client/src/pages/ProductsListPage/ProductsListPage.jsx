import './ProductsListPage.css'

import { useState, useEffect } from 'react'
import productsService from '../../services/products.service'
import ProductsList from '../../components/ProductsList/ProductsList'
import Loader from '../../components/Loader/Loader'
import { Container } from 'react-bootstrap'
import ProductsFilter from '../../components/ProductsFilter/ProductsFilter'
import { useContext } from 'react'
import { ProductContext } from '../../contexts/products.context'


const ProductsListPage = ({ refreshProducts }) => {

    const [filteredProducts, setFilteredeProducts] = useState(null)
    const { refreshAll, allProducts } = useContext(ProductContext)


    useEffect(() => {
        refreshAll()
    }, [])

    useEffect(() => {
        if (allProducts) setFilteredeProducts(allProducts)
    }, [allProducts])

    return (
        <>
            <div>
                <Container className=' mt-5'>

                    <ProductsFilter setProducts={setFilteredeProducts} />
                </Container>

                <Container className='d-grid mb-5'>
                    <h1 className='text-center mt-4'>Nuestros Productos</h1>
                    <hr />
                    {!filteredProducts ? <Loader /> : <ProductsList products={filteredProducts} />}
                    {/* {!userFavs ? <Loader /> : <ProductsList refreshProducts={getUserFavorites} />} */}
                </Container>
            </div>
        </>
    )
}

export default ProductsListPage