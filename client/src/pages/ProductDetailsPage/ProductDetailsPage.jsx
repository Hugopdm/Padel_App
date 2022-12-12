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
        <Container>
            {
                !product
                    ?
                    <h1>Loading...</h1>
                    :
                    <>
                        <Row className="mt-5 justify-content-center">


                            <Col md={{ span: 3 }}>
                                <img src={imageUrl} style={{ width: '100%' }} />
                            </Col>

                            <Col md={{ span: 4 }}>
                                <Card border="success" style={{ width: '18rem' }}>
                                    <Card.Header className="text-center">{category}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{productName}</Card.Title>
                                        <Card.Text>{description}</Card.Text>
                                        <Card.Text>{price} € </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Link to="/productos">
                                <Button as="div" variant="dark">Volver a la galería</Button>
                            </Link>


                            {/* <h1 className="mt-4 mb-4">{productName}</h1>

                            <Col md={{ span: 6, offset: 1 }}>
                                <h5>Descripción</h5>
                                <p>{description}</p>
                                <h5>Precio</h5>
                                <p>{price} €</p>
                                <hr />

                                <Link to="/productos">
                                    <Button as="div" variant="dark">Volver a la galería</Button>
                                </Link>
                            </Col> */}

                        </Row>
                    </>
            }
        </Container >
    )
}

export default ProductDetailsPage