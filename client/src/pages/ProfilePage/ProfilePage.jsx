import './ProfilePage.css'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import productsService from '../../services/products.service'
import NewProductForm from './../../components/NewProductForm/NewProductForm'
import ProductsList from '../../components/ProductsList/ProductsList'
import Loader from '../../components/Loader/Loader'

const ProfilePage = () => {

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
    }

    useEffect(() => {
        loadProducts()
        getLikedProduct()
    }, [])


    return (
        <>

            <Container>
                <Row>
                    <Col>
                        <h1>Tus productos</h1>
                        <hr />
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
                    </Col>
                    <Col>
                        <h1>Me interesa</h1>
                        <hr />
                        {!favProducts ? <Loader /> : <ProductsList products={favProducts} refreshProducts={getLikedProduct} />}

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default ProfilePage