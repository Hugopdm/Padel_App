import { useState, useEffect } from "react"
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

        <UserConversations userConversations={userConversations} />

    )

}

export default UserConversationsPage