import { useEffect, useState } from "react"
import { useContext } from "react"
import { Outlet, Navigate, useParams } from "react-router-dom"
import Loader from "../components/Loader/Loader"
import { AuthContext } from "../contexts/auth.context"
import conversationsService from "../services/conversations.service"

const ConversationPrivate = () => {

    const { user, isLoading } = useContext(AuthContext)
    const [conversation, setConversation] = useState()
    const [convLoading, setConvLoading] = useState(false)

    const { conversation_id } = useParams()

    const getConversation = () => {
        setConvLoading(true)
        conversationsService
            .getOneConversation(conversation_id)
            .then(({ data }) => {
                setConvLoading(false)
                setConversation(data)
            })
            .catch(console.log)
    }

    useEffect(() => {
        getConversation()

    }, [])


    // console.log(user, isLoading)
    if (isLoading && convLoading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/iniciar-sesion" />
    }

    if (conversation && conversation.productOwner !== user._id && conversation.user !== user._id) {
        return <Navigate to="/productos" />
    }




    return <Outlet />
}

export default ConversationPrivate