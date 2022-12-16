import './ProductDetailsPage.css'

import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import productsService from "../../services/products.service"


const ProductDetailsPage = () => {

    const [product, setProduct] = useState({})

    const { product_id } = useParams()

    const loadOneProduct = () => {
        productsService
            .getOneProduct(product_id)
            .then(({ data }) => setProduct(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        loadOneProduct()
    }, [])



    const { description, productName, price, category, imageUrl } = product

    return (
        <Container className="ProductsDetails">
            {
                !product
                    ?
                    <h1>Loading...</h1>
                    :
                    <>
                        <Row className="mt-5 justify-content-center">
                            <h1 className="text-center">{category}</h1>
                            <hr />
                            <Link className="mt-4 text-center" to="/productos">
                                <Button as="div" variant="outline-dark" className='products'>Volver a la galería</Button>
                            </Link>

                            <Col className="img mt-5" md={{ span: 3 }}>
                                <img src={imageUrl} style={{ width: '100%' }} />
                            </Col>

                            <Col className="mt-5" md={{ span: 4 }}>
                                <Card border="success" style={{ width: '18rem' }}>
                                    <Card.Header className="text-center">{category}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{productName}</Card.Title>
                                        <Card.Text>{description}</Card.Text>
                                        <Card.Text className="price">{price} € </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                    </>
            }
        </Container >
    )
}

export default ProductDetailsPage