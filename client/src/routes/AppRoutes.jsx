import { Routes, Route } from 'react-router-dom'
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage'


const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<h1>Este es el inicio</h1>} />
            <Route path='/productos' element={<ProductsListPage />} />
        </Routes>
    )
}

export default AppRoutes