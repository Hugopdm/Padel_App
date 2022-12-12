import { Container, Row, Col } from 'react-bootstrap'
import SignupForm from '../../components/SignupForm/SignupForm'

const SignupPage = () => {

    return (

        <Container className='mt-5 text-white'>

            <Row>

                <div>
                    <div className="bg"></div>
                    <div className="bg bg2"></div>
                    <div className="bg bg3"></div>
                </div >

                <Col md={{ offset: 3, span: 6 }}>

                    <h1 className='text-center'>Registro</h1>

                    <hr />

                    <SignupForm />
                    <hr />

                </Col>
            </Row>

        </Container>
    )
}

export default SignupPage