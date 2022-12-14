import axios from 'axios'

class ConversationService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/conversations`
        })


        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    createConversation(product_id) {
        return this.api.post(`/createConversation/${product_id}`)
    }

    addMessage(conversation_id, body) {
        return this.api.put(`/addMessage/${conversation_id}`, body)
    }

    getMessages(conversation_id) {
        return this.api.get(`/getMessages/${conversation_id}`)
    }

    getUserConversations() {
        return this.api.get('/getUserConversations')
    }
}

const conversationsService = new ConversationService()

export default conversationsService