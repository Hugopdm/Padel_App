import { Routes, Route } from 'react-router-dom'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage'


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<h1>Este es el inicio</h1>} />
            <Route path='/productos' element={<ProductsListPage />} />
            <Route path='/detalles/:product_id' element={<ProductDetailsPage />} />
        </Routes>
    )
}

export default AppRoutes