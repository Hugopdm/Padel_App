import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import authService from '../../services/auth.service'
import { AuthContext } from "../../contexts/auth.context"
import { useNavigate } from "react-router-dom"
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const LoginForm = () => {

    const [signupData, setSignupData] = useState({

        email: '',
        password: ''

    })

    const [errors, setErrors] = useState([])
    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(signupData)
            .then(({ data }) => {
                const tokenFromServer = data.authToken
                storeToken(tokenFromServer)
                authenticateUser()
                navigate('/perfil')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }


    const { password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button variant="dark" type="submit">Iniciar sesión</Button>
            </div>

        </Form>
    )
}

export default LoginForm









// const LoginForm = () => {

//     const [signupData, setSignupData] = useState({
//         email: '',
//         password: ''
//     })

//     const handleInputChange = e => {
//         const { value, name } = e.target
//         setSignupData({ ...signupData, [name]: value })
//     }

//     // const navigate = useNavigate()

//     // const { storeToken, authenticateUser } = useContext(AuthContext)


//     const handleSubmit = e => {

//         e.preventDefault()

//         authService
//             .login(signupData)
//             .then(({ data }) => {
//                 const tokenFromServer = data.authToken
//                 storeToken(tokenFromServer)
//                 authenticateUser()
//                 navigate('/perfil')
//             })
//             .catch(err => console.log(err))
//     }

//     const { password, email } = signupData

//     return (

//         <Form onSubmit={handleSubmit}>

//             <Form.Group className="mb-3" controlId="email">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="password">
//                 <Form.Label>Contraseña</Form.Label>
//                 <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
//             </Form.Group>

//             <div className="d-grid">
//                 <Button variant="dark" type="submit">Acceder</Button>
//             </div>

//         </Form>
//     )
// }

// export default LoginForm