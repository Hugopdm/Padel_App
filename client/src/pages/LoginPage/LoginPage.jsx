import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../../components/LoginForm/LoginForm'

const LoginPage = () => {

    return (

        <Container className='mt-5 text-white'>

            <Row>

                <div>
                    <div className="bg"></div>
                    <div className="bg bg2"></div>
                    <div className="bg bg3"></div>
                </div >

                <Col md={{ offset: 3, span: 6 }}>

                    <h1 className='text-center'>Iniciar sesión</h1>

                    <hr />

                    <LoginForm />
                    <hr />
                </Col>
            </Row>

        </Container>
    )
}

export default LoginPage