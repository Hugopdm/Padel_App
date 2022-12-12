import ProductCard from '../ProductCard/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'
import './ProductsList.css'



const ProductsList = ({ products, refreshProducts }) => {


    return (

        <Container >
            <Row>
                {products.map(elm => {
                    return (


                        <Col key={elm._id} md={{ span: 3 }} >
                            <ProductCard {...elm} refreshProducts={refreshProducts} />
                        </Col>

                    )
                })}
            </Row>
        </Container>

    )
}

export default ProductsList