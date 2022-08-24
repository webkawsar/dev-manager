import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './App';
import { AuthProvider } from './context/Auth.context';
import { ContactProvider } from './context/Contact.context';
import './index.css';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ContactProvider>
        <App />
      </ContactProvider>
    </AuthProvider>
  </React.StrictMode>
)
