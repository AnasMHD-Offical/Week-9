import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import store from './Store/Store.jsx'
import App from './App.jsx'
import './index.css'
import "react-toastify/ReactToastify.css"
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>,
  </Provider>
)
