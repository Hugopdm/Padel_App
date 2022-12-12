import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth.context'
import { MessageProviderWrapper } from './contexts/userMessage.context'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(

  <React.StrictMode>
    < MessageProviderWrapper>
      <AuthProviderWrapper>
        <Router>
          <App />
        </Router>
      </AuthProviderWrapper>
    </ MessageProviderWrapper >
  </React.StrictMode>

)

