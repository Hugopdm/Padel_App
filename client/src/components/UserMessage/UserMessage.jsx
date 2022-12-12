import { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageContext } from '../../contexts/userMessage.context'

const UserMessage = () => {

    const { setShowToast, toastMessage, showToast } = useContext(MessageContext)

    return (
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide style={{ position: 'fixed', bottom: 10, right: 10 }}>
            <Toast.Header>
                <strong className="me-auto">Mensaje</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>

    )
}

export default UserMessage