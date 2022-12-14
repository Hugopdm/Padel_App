import './ProductsList.css'
import ProductCard from '../ProductCard/ProductCard'
import { Container, Row, Col } from 'react-bootstrap'


const ProductsList = ({ products }) => {

    return (

        <Container >
            <Row>
                {products.map(elm => {
                    return (

                        <Col key={elm._id} md={{ span: 3 }} >
                            <ProductCard {...elm} />
                        </Col>

                    )
                })}
            </Row>
        </Container>

    )
}



export default ProductsList