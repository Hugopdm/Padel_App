import './Navigation.css'
import { useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown, Image } from 'react-bootstrap'
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
                        <Nav.Link as="div">¡Hola, {!user ? 'invitad@' : user.userName}!</Nav.Link>

                        {user ?
                            <>
                                <Link to='/productos'>
                                    <Nav.Link as="div">Tienda</Nav.Link>
                                </Link>
                            </>
                            :
                            <>
                                <Nav.Link as="div">Regístrate par ver nuestra Tienda</Nav.Link>
                            </>

                        }

                    </Nav>

                    <Nav className='me-rigth'>

                        {user ?
                            <>
                                <Link to='/'>
                                    <Nav.Link as="div" onClick={logoutUser}>Cerrar sesión</Nav.Link>
                                </Link>

                                <Link to="/perfil">
                                    <Nav.Link as="div">Mi perfil</Nav.Link>
                                </Link>
                                <Image src={user.imageUrl} alt="user image" className='userimgnav' />
                            </>
                            :
                            <>
                                <NavDropdown title="Únete" id="basic-nav-dropdown">
                                    <Link to='/registro'>
                                        <NavDropdown.Item as="div">Registrarse</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Divider />
                                    <Link to='/iniciar-sesion'>
                                        <NavDropdown.Item as="div">Iniciar sesión</NavDropdown.Item>
                                    </Link>
                                </NavDropdown>
                            </>
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation