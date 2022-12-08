import './ProductCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// import { useState, useEffect } from 'react'
// import { Modal } from 'react-bootstrap'
// import productsService from '../../services/products.service'
// import Loader from '../../components/Loader/Loader'
// import EditProductForm from '../EditProductForm/EditProductForm'
// import ProductsList from '../../components/ProductsList/ProductsList'


function ProductCard({ productName, imageUrl, _id, owner }) {

    // const [products, setProducts] = useState(null)
    // const [showModal, setShowModal] = useState(false)

    // const openModal = () => setShowModal(true)
    // const closeModal = () => setShowModal(false)

    // const loadProducts = () => {
    //     productsService
    //         .getUserProducts()
    //         .then(({ data }) => setProducts(data))
    //         .catch(err => console.log(err))
    // }

    // const fireFinalActions = () => {
    //     closeModal()
    //     loadProducts()
    // }


    // useEffect(() => {
    //     loadProducts()
    // }, [])


    return (

        <Card className='ProductCard mb-4'>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Link to={`/detalles/${_id}`} >
                    <div className='d-grid'>
                        <Button variant="dark">Detalles</Button>
                    </div>
                </Link>

                {!owner &&
                    <>
                        <Button variant='warning' /*onClick={openModal}*/>Editar</Button>
                        <Button variant='danger' /*onClick={openModal}*/>Eliminar</Button>
                    </>
                }

            </Card.Body>
        </Card>



        // <Modal show={showModal} onHide={closeModal}>
        //     <Modal.Header closeButton>
        //         <Modal.Title>Editar Producto</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <EditProductForm fireFinalActions={fireFinalActions} /*setShowToast={setShowToast} setToastMessage={setToastMessage}*/ />
        //     </Modal.Body >
        // </Modal >

    )
}

export default ProductCard