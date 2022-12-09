import ProductCard from '../ProductCard/ProductCard'
import { Row, Col } from 'react-bootstrap'
import './ProductsList.css'



const ProductsList = ({ products, refreshProducts }) => {


    return (
        <Row>
            {products.map(elm => {
                return (
                    <Col key={elm._id} md={{ span: 3 }} >
                        <ProductCard {...elm} refreshProducts={refreshProducts} />
                    </Col>
                )
            })}
        </Row>
    )
}

export default ProductsList