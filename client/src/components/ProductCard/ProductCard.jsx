import './ProductCard.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

function ProductCard({ productName, imageUrl, _id }) {
    return (
        <Card className='ProductCard mb-4'>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{productName}</Card.Title>
                <Link to={`/detalles/${_id}`} >
                    <div className='d-grid'>
                        <Button variant="dark">Detalles del producto</Button>
                    </div>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default ProductCard