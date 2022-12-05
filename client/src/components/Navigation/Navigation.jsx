import './Navigation.css'

import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
            <Container>
                <Link to='/'>
                    <Navbar.Brand as="div">Padel_App</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/productos'>
                            <Nav.Link as="div">Tienda</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation