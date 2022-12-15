import './ProductCard.css'
import { Button, Container, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Modal } from 'react-bootstrap'
import productsService from '../../services/products.service'
import EditProductForm from '../EditProductForm/EditProductForm'
import { AuthContext } from '../../contexts/auth.context'
import { ProductContext } from '../../contexts/products.context'
import conversationsService from '../../services/conversations.service'


function ProductCard({ productName, imageUrl, _id, owner, price, category, description }) {

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)
    const { favProducts, refreshAll } = useContext(ProductContext)

    // const [myConversations, setMyConversations] = useState()

    const product = {
        productName,
        imageUrl,
        _id,
        owner,
        price,
        category,
        description
    }

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const likeProduct = () => {

        productsService
            .likeProduct(_id)
            .then(() => refreshAll())
            .catch(err => console.log(err))
    }

    const unlikeProduct = () => {

        productsService
            .unlikeProduct(_id)
            .then(() => refreshAll())
            .catch(err => console.log(err))
    }

    const deleteProduct = () => {

        productsService
            .deleteProduct(_id)
            .then(() => refreshAll())
            .catch(err => console.log(err))
    }

    const createConversation = () => {

        conversationsService
            .getUserConversations(_id)
            .then(({ data }) => {

                if (data) {
                    navigate(`/conversacion/${data._id}`)
                } else {

                    conversationsService
                        .createConversation(_id)
                        .then(({ data }) => navigate(`/conversacion/${data._id}`))
                        .catch(console.log)
                }
                // console.log(data)
            })
            .catch(err => console.log(err))
    }

    // const getMyConversations = () => {

    //     conversationsService
    //         .getUserConversations(_id)
    //         .then(({ data }) => setMyConversation(data))
    //         .catch(err => console.log(err))
    // }


    const fireFinalActions = () => {
        closeModal()
        refreshAll()
    }

    useEffect(() => {
        refreshAll()
    }, [])

    let ids
    if (favProducts) { ids = favProducts.map((elm) => elm._id) }

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


                    {ids && !ids.includes(product._id) ?

                        <div className='d-grid'>

                            <Button variant="success" onClick={likeProduct}>Me interesa</Button>

                        </div>

                        :
                        <div className='d-grid'>
                            <Button variant="secondary" onClick={unlikeProduct}>No me interesa</Button>
                            {owner !== user._id &&
                                <Button variant="info" onClick={createConversation}>Contactar</Button>
                            }
                            {/* {owner === user._id &&
                                <Button variant="dark" onClick={createConversation}>Mensajes</Button>
                            } */}

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