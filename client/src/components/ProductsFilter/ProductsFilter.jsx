import { useState, useEffect } from "react"
import { Stack, Form } from "react-bootstrap"
import productsService from "../../services/products.service"


const ProductsFilter = ({ setProducts }) => {

    const [allProducts, setAllProducts] = useState([{
        productName: '',
        description: '',
        category: '',
        price: 0,
        imageUrl: ''
    }])


    const loadProducts = () => {
        productsService
            .getProducts()
            .then(({ data }) => {
                setAllProducts(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        loadProducts()
    }, [])


    const handleSelect = (e) => {
        console.log(e)
        if (e.target.value === 'Todos') {
            setProducts(allProducts)
        } else {
            const filtered = allProducts.filter(elm => elm.category === e.target.value)
            setProducts(filtered)
        }
    }

    const categories = allProducts.map((elm) => elm.category)

    const set = new Set(categories)
    console.log(set)
    const cleanCategories = []


    return (

        <Stack direction="horizontal" gap={3}>
            <div className="vr" />
            <Form.Select type='select' name="category" onChange={handleSelect}>
                {cleanCategories.map((elm, idx) => {
                    return (
                        <option key={idx}>{elm}</option>
                    )
                }

                    // {/* <option onSelect={handleSelect} value='Palas'>Palas</option>
                    // <option onSelect={handleSelect} value='Calzado'>Calzado</option>
                    // <option onSelect={handleSelect} value='Ropa'>Ropa</option>
                    // <option onSelect={handleSelect} value='Accesorios'>Accesorios</option> */}
                )}
            </Form.Select>

            {/* <Button variant="dark">Buscar</Button> */}
            <div className="vr" />
        </Stack>
    )
}

export default ProductsFilter