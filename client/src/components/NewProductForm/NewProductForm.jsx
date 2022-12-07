import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import productsService from '../../services/products.service'
import uploadServices from '../../services/upload.service'


const NewProductForm = ({ fireFinalActions }) => {

    const [productData, setProductData] = useState({
        productName: '',
        description: '',
        category: '',
        price: 0,
        imageUrl: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.target
        setProductData({ ...productData, [name]: value })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setProductData({ ...productData, imageUrl: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        productsService
            .saveProduct(productData)
            .then(() => fireFinalActions())
            .catch(err => console.error(err))
    }

    const { productName, description, category, price, imageUrl } = productData

    return (

        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Producto</Form.Label>
                <Form.Control type="text" value={productName} onChange={handleInputChange} name="productName" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select type="select" onChange={handleInputChange} name="category">
                            <option >Selecciona categoría</option>
                            <option value="palas">Palas</option>
                            <option value="calzado">Calzado</option>
                            <option value="ropa">Ropa</option>
                            <option value="accesorios">Accesorios</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="number" value={price} onChange={handleInputChange} name="price" />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Imagen del producto</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Crear producto'}</Button>
        </Form>

    )
}

export default NewProductForm