import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from '../../services/auth.service'
import uploadServices from '../../services/upload.service'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        userName: '',
        email: '',
        password: '',
        imageUrl: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setSignupData({ ...signupData, imageUrl: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }


    const navigate = useNavigate()

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => {
                navigate('/iniciar-sesion')
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }



    const { userName, password, email, imageUrl } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="userName">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" value={userName} onChange={handleInputChange} name="userName" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Email</Form.Label>
                <Form.Control type="file" value={email} onChange={handleInputChange} name="imageUrl" />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Imagen</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <hr />
            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}
            <div className="d-grid">
                <Button variant="secondary" type="submit">Registrarme</Button>
            </div>

        </Form>
    )
}

export default SignupForm
