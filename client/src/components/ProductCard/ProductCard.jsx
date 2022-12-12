import './ProductCard.css'
import { Button, Container, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import productsService from '../../services/products.service'
import EditProductForm from '../EditProductForm/EditProductForm'
import { AuthContext } from '../../contexts/auth.context'


function ProductCard({ productName, imageUrl, _id, owner, price, category, description, refreshProducts }) {
    // console.log(refreshProducts)

    const { user } = useContext(AuthContext)

    const product = {
        productName,
        imageUrl,
        _id,
        owner,
        price,
        category,
        description
    }

    const [products, setProducts] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const likeProduct = () => {

        productsService
            .likeProduct(_id)
            .then(() => refreshProducts())
            .catch(err => console.log(err))
    }

    const unlikeProduct = () => {

        productsService
            .unlikeProduct(_id)
            .then(() => refreshProducts())
            .catch(err => console.log(err))
    }


    const navigate = useNavigate()

    const deleteProduct = () => {

        productsService
            .deleteProduct(_id)
            .then(() => refreshProducts())
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        closeModal()
        refreshProducts()


    }

    // useEffect(() => {
    //     loadProducts()
    // }, [])


    return (


        <Container>
            <Card className='ProductCard mb-4'>

                <Card.Body >

                    <Link to={`/detalles/${_id}`} >
                        <div className='d-grid'>
                            <Card.Img variant="top" src={imageUrl} />
                        </div>
                    </Link>
                    {/* <Card.Title className='text-center'>{productName}</Card.Title> */}

                    {!user?.favProduct?.includes(product._id) ?

                        <div className='d-grid'>
                            <Button variant="success" onClick={likeProduct}>Me interesa</Button>
                        </div>
                        :
                        <div className='d-grid'>
                            <Button variant="secondary" onClick={unlikeProduct}>No me interesa</Button>
                        </div>
                    }

                    {owner === user._id &&
                        <>
                            <Button variant='warning' onClick={openModal}>Editar</Button>
                            <Link>
                                <Button variant='danger' onClick={deleteProduct}>Eliminar</Button>
                            </Link>
                        </>
                    }
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProductForm fireFinalActions={fireFinalActions} product={product} />
                </Modal.Body >
            </Modal >
        </Container>

    )
}

export default ProductCard