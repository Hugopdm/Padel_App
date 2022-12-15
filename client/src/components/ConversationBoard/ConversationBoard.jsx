import { useState } from "react"
import { Button, Row, Form, Col, Container } from "react-bootstrap"
import ConversationBoardPage from "../../pages/ConversationBoardPage/ConversationBoardPage"
import conversationService from "../../services/conversations.service"

const ConversationBoard = ({ id, getConversation }) => {

    const [message, setMessage] = useState({
        message: ''
    })


    const handleInputChange = e => {
        const { name, value } = e.target
        setMessage({ message, [name]: value })
    }


    const handleFormSubmit = e => {
        e.preventDefault()

        conversationService
            .addMessage(id, message)
            .then(() => getConversation())  //si falla cambiar por un console.log('MENSAJE ENVIADO')
            .catch(err => console.log(err))
    }



    return (
        <Container className="mb-5">
            <Row>
                <Col>
                    <h1 className="text-center">Chat</h1>
                    <hr />
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-1 mt-4" controlId="text" >
                            {/* <Form.Label></Form.Label> */}
                            <Form.Control type="text" name="message" onChange={handleInputChange} value={message.message} />
                            <Button className="mt-1" variant="secondary" type="submit">Enviar</Button>
                        </Form.Group>
                    </Form >
                </Col>
            </Row>
        </Container>

    )
}

export default ConversationBoard




{/* return (

{conversation.map(elm => {
    <Col key={elm._id} md={{ span: 3 }} >
    <ConversationBoardPage {...elm} />
    </Col>
    
    )
})} */}