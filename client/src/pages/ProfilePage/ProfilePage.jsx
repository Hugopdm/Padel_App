import './ProfilePage.css'
import { useState, useEffect } from 'react'
import { Container, Button, Modal } from 'react-bootstrap'
import productsService from '../../services/products.service'
import NewProductForm from './../../components/NewProductForm/NewProductForm'
import ProductsList from '../../components/ProductsList/ProductsList'


const ProfilePage = () => {

    const [products, setProducts] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const loadProducts = () => {
        productsService
            .getUserProducts()
            .then(({ data }) => setProducts(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        closeModal()
        loadProducts()

    }

    useEffect(() => {
        loadProducts()
    }, [])


    return (
        <>
            <Container>
                <h1>Añade tu producto</h1>
                <hr />
                <Button variant='dark' onClick={openModal}>Crear Producto</Button>
            </Container>

            {!products ? <h1>Esperando...</h1> : <ProductsList products={products} />}

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewProductForm fireFinalActions={fireFinalActions} /*setShowToast={setShowToast} setToastMessage={setToastMessage}*/ />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProfilePage