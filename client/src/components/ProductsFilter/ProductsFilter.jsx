import { useContext } from "react"
import { useState, useEffect } from "react"
import { Stack, Form } from "react-bootstrap"
import { ProductContext } from "../../contexts/products.context"
import productsService from "../../services/products.service"


const ProductsFilter = ({ setProducts }) => {

    const { refreshAll, allProducts } = useContext(ProductContext)
    const [mySet, setMySet] = useState([])

    useEffect(() => {
        refreshAll()
    }, [])

    useEffect(() => {
        console.log('useEffecct')
        let mySet = []

        if (allProducts) {

            const categories = allProducts.map((elm) => elm.category)
            mySet = new Set(categories)

        }

        setMySet([...mySet])

    }, [allProducts])


    const handleSelect = (e) => {
        // console.log(e)
        if (e.target.value === 'Todos') {
            setProducts(allProducts)
        } else {
            const filtered = allProducts.filter(elm => elm.category === e.target.value)
            setProducts(filtered)
        }
    }


    return (

        <Stack direction="horizontal" gap={3}>
            <div className="vr" />
            <Form.Select type='select' name="category" onChange={handleSelect}>
                {mySet.map((elm, idx) => {
                    return (
                        <option key={idx}>{elm}</option>
                    )
                })}
                <option key={Math.random()}>{'Todos'}</option>

            </Form.Select>
            {/* <Button variant="dark">Buscar</Button> */}
            <div className="vr" />
        </Stack>
    )
}

export default ProductsFilter