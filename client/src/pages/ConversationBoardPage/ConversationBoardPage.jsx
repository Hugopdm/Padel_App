import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Image, Button, Container } from "react-bootstrap"
import ConversationBoard from "../../components/ConversationBoard/ConversationBoard"
import conversationsService from "../../services/conversations.service"


const ConversationBoardPage = () => {


    const [conversation, setConversation] = useState([])

    const { conversation_id } = useParams()

    const getConversation = () => {

        conversationsService
            .getMessages(conversation_id)
            .then(({ data }) => setConversation(data.messages))
            .catch(err => console.log(err))

    }

    useEffect(() => {

        getConversation()

    }, [])



    return (
        <Container className='mb-5'>
            <ConversationBoard id={conversation_id} getConversation={getConversation} />

            {conversation.map(elm => {
                return (
                    // <Col key={elm._id} md={{ span: 3 }} >

                    //     <ConversationBoard {...elm} id={conversation_id} getConversation={getConversation} />
                    // </Col>

                    < Card key={elm._id} className='mb-5'>
                        <Card.Header>
                            <h6>{elm.writer.userName}</h6>
                            {/* <Image src="" alt="" /> */}
                        </Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>{elm.message}</p>
                            </blockquote>

                            {/* <Button variant='danger' >Eliminar</Button> */}
                        </Card.Body>
                    </Card >
                )
            })}
        </Container>
    )
}

export default ConversationBoardPage

