import { Routes, Route } from 'react-router-dom'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<h1>Este es el inicio</h1>} />
            <Route path='/registro' element={<SignupPage />} />
            <Route path='/iniciar-sesion' element={<LoginPage />} />
            <Route path='/perfil' element={<ProfilePage />} />
            <Route path='/productos' element={<ProductsListPage />} />
            <Route path='/detalles/:product_id' element={<ProductDetailsPage />} />
        </Routes>
    )
}

export default AppRoutes