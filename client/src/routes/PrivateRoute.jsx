import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import Loader from "../components/Loader/Loader"
import { AuthContext } from "../contexts/auth.context"

const PrivateRoute = () => {

    const { user, isLoading } = useContext(AuthContext)

    // console.log(user, isLoading)
    if (isLoading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/iniciar-sesion" />
    }

    return <Outlet />
}

export default PrivateRoute