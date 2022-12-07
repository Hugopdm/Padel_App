import './Navigation.css'
import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Navbar className='navbar' bg="dark" variant='dark' expand="lg">
            <Container>
                <Link to='/'>
                    <Navbar.Brand as="div">Padeller</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <Link to='/productos'>
                            <Nav.Link as="div">Tienda</Nav.Link>
                        </Link>
                    </Nav>

                    <Nav>
                        <Link to='/'>
                            <Nav.Link as="div" onClick={logoutUser}>Cerrar sesión</Nav.Link>
                        </Link>
                    </Nav>

                    <NavDropdown title="Mi perfil" id="basic-nav-dropdown">
                        <Link to='/registro'>
                            <NavDropdown.Item as="div">Registrarse</NavDropdown.Item>
                        </Link>
                        <Link to='/iniciar-sesion'>
                            <NavDropdown.Item as="div">Iniciar sesión</NavDropdown.Item>
                        </Link>
                        <NavDropdown.Divider />
                        <Link to="/perfil">
                            <NavDropdown.Item as="div">Mi perfil</NavDropdown.Item>
                        </Link>
                    </NavDropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation