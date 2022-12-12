import './ProfilePage.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Image } from 'react-bootstrap'
import productsService from '../../services/products.service'
import NewProductForm from './../../components/NewProductForm/NewProductForm'
import ProductsList from '../../components/ProductsList/ProductsList'
import Loader from '../../components/Loader/Loader'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'


const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const [products, setProducts] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [favProducts, setFavProducts] = useState(null)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)


    const loadProducts = () => {

        productsService
            .getUserProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    const getLikedProduct = () => {

        productsService
            .getLikedProduct()
            .then(({ data }) => setFavProducts(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        closeModal()
        loadProducts()
        // setShowToast(true)
        // setToastMessage('Producto creado en la BBDD')

    }

    useEffect(() => {
        loadProducts()
        getLikedProduct()
    }, [])


    return (
        <>
            <div className='ProfilePage'>
                <Container>
                    <Row className='mt-4'>
                        {/* <Col>

                            <h1>{user.userName}</h1>
                        </Col> */}
                        <Col >
                            <Image src={user.imageUrl} alt="user image" className='userimg' />

                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col className='mb-5'>
                            <h1>Productos en venta</h1>
                            <Button variant='dark' onClick={openModal}>Crear Producto</Button>
                            <hr />

                            {!products ? <Loader /> : <ProductsList products={products} refreshProducts={loadProducts} />}

                            <Modal show={showModal} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Crear Producto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <NewProductForm fireFinalActions={fireFinalActions} /*setShowToast={setShowToast} setToastMessage={setToastMessage}*/ />
                                </Modal.Body>
                            </Modal>
                            <Row className='likedprod mb-5'>
                                <h1>Me interesa</h1>
                                <hr />
                                {!favProducts ? <Loader /> : <ProductsList products={favProducts} refreshProducts={getLikedProduct} />}

                            </Row>
                        </Col>

                    </Row>
                </Container >
            </div>
        </>
    )
}

export default ProfilePage