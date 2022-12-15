import './UserConversationsPage.css'

import { useState, useEffect } from "react"
import { Container, ListGroup } from "react-bootstrap"
import UserConversations from "../../components/UserConversations/UserConversations"
import conversationsService from "../../services/conversations.service"


const UserConversationsPage = () => {

    const [userConversations, setUserConversations] = useState([])

    const getMyProductsConversations = () => {

        conversationsService
            .getMyProductsConversations()
            .then(({ data }) => setUserConversations(data))
            .catch(err => console.log(err))

    }

    useEffect(() => {

        getMyProductsConversations()

    }, [])



    return (
        <Container className="mt-5 mb-5">

            <h1 className="text-center">Clientes</h1>
            <hr />

            <UserConversations userConversations={userConversations} />

        </Container>
    )

}

export default UserConversationsPage