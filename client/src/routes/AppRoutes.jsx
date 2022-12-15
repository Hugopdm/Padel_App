import { Routes, Route } from 'react-router-dom'
import ProductDetailsPage from '../pages/ProductDetailsPage/ProductDetailsPage'
import ProductsListPage from '../pages/ProductsListPage/ProductsListPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import PrivateRoute from './PrivateRoute'
import HomePage from '../pages/HomePage/HomePage'
import ConversationBoardPage from '../pages/ConversationBoardPage/ConversationBoardPage'
import ConversationPrivate from './ConversationPrivate'
import UserConversationsPage from '../pages/UserConversationsPage/UserConversationsPage'


const AppRoutes = () => {
    return (

        <Routes>

            <Route path='/' element={<HomePage />} />
            <Route path='/registro' element={<SignupPage />} />
            <Route path='/iniciar-sesion' element={<LoginPage />} />

            <Route element={<PrivateRoute />}>
                <Route path='/perfil' element={<ProfilePage />} />
                <Route path='/productos' element={<ProductsListPage />} />
                <Route path='/detalles/:product_id' element={<ProductDetailsPage />} />
                <Route path='/ventas' element={<UserConversationsPage />} />
                <Route element={<ConversationPrivate />}>
                    <Route path='/conversacion/:conversation_id' element={<ConversationBoardPage />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default AppRoutes