import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import "./assets/style.scss";
import App from './App.jsx'
import { DataProvider } from './context/DataContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ToastContainer, Slide } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
        <App />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </CartProvider>
    </DataProvider>
  </StrictMode>
)
