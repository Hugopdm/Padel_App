import { useState } from "react"
import { Button, Card, Form, Col } from "react-bootstrap"
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
        <>

            <h1>Tablón de conversación</h1>



            <Form onSubmit={handleFormSubmit} >
                <Form.Group className="mb-3" controlId="text" >
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control type="text" name="message" onChange={handleInputChange} value={message.message} />

                    <Button variant="secondary" type="submit">Enviar</Button>
                </Form.Group>
            </Form >

        </>

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