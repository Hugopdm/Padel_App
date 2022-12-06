import ProductCard from '../ProductCard/ProductCard'
import { Row, Col } from 'react-bootstrap'
import './ProductsList.css'



const ProductsList = ({ products }) => {

    return (
        <Row>
            {products.map(elm => {
                return (
                    <Col key={elm._id} md={{ span: 3 }} >
                        <ProductCard {...elm} />
                    </Col>
                )
            })}
        </Row>
    )
}

export default ProductsList