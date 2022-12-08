import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
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

    const { description, productName, price, imageUrl } = product

    return (
        <Container>
            {
                !product
                    ?
                    <h1>Loading...</h1>
                    :
                    <>
                        <h1 className="mb-4">Detalles de {productName}</h1>
                        <hr />
                        <Row>
                            <Col md={{ span: 6, offset: 1 }}>
                                <h3>Descripción</h3>
                                <p>{description}</p>
                                <h4>Precio</h4>
                                <p>{price}</p>
                                <hr />

                                <Link to="/productos">
                                    <Button as="div" variant="dark">Volver a la galería</Button>
                                </Link>
                            </Col>

                            <Col md={{ span: 4 }}>
                                <img src={imageUrl} style={{ width: '100%' }} />
                            </Col>
                        </Row>
                    </>
            }
        </Container >
    )
}

export default ProductDetailsPage