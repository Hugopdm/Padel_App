import './UserConversations.css'

import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Button } from 'react-bootstrap'


const UserConversations = ({ userConversations }) => {

    console.log(userConversations)
    const navigate = useNavigate()

    const redirectToChat = (chat_id) => {
        navigate(`/conversacion/${chat_id}`)
    }

    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    {userConversations.map(elm => {

                        return (

                            <>
                                <div class="container d-flex justify-content-center" onClick={() => redirectToChat(elm._id)}>
                                    <ul class="list-group text-white">
                                        <li class="list-group-item d-flex justify-content-between align-content-center">

                                            <div class="d-flex flex-row">
                                                <div >
                                                    <div>

                                                        <h4 >{elm.product?.productName}</h4>
                                                        <hr />
                                                        <div class="about">
                                                            <h6>{elm.user.userName}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="check" >
                                                <img src={elm.user.imageUrl} width="40" class='userimgchat ' />
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                            </>
                        )

                        //         < div class="container d-flex justify-content-center" >

                        // <ul class="list-group mt-5 text-white">
                        //     <li class="list-group-item d-flex justify-content-between align-content-center">

                        //         <div class="d-flex flex-row">
                        //             <img src="https://img.icons8.com/color/100/000000/folder-invoices.png" width="40" />
                        //             <div class="ml-2">
                        //                 <h6 class="mb-0">Ogivet Maither</h6>
                        //                 <div class="about">
                        //                     <span>22 Files</span>
                        //                     <span>Jan 21, 2020</span>
                        //                 </div>
                        //             </div>
                        //         </div>
                        //         <div class="check">

                        //             <input type="checkbox" name="a">
                        //         </div>

                        //     </li>


                    })}
                </Col>
            </Row>
        </Container>
    )
}

export default UserConversations