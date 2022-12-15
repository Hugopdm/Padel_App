import { useNavigate } from "react-router-dom"



const UserConversations = ({ userConversations }) => {

    console.log(userConversations)
    const navigate = useNavigate()

    const redirectToChat = (chat_id) => {
        navigate(`/conversacion/${chat_id}`)
    }

    return (
        <>
            {userConversations.map(elm => {
                return (
                    <h6 onClick={() => redirectToChat(elm._id)}>{elm.product?.productName} con {elm.user.userName}</h6>)
            })}
        </>
    )
}

export default UserConversations