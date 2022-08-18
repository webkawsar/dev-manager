import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './layouts/Header';
import AddContact from './pages/AddContact';
import ContactDetails from './pages/ContactDetails';
import Contacts from './pages/Contacts';
import EditContact from './pages/EditContact';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';



// dev manager
// CRUD
// form handling
// remote api server connection and handling
// routing
// context api
// authentication (registration, login, logout)
// advance login (forgot password, reset password, email sending)
// image upload, pagination
// securely data dealing
// sass / scss
// search functionality




const App = () => {
  

  
  return (
    <>
      <BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Header />
          <Container style={{margin: '0 auto'}} className='mt-3'>
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>

              <Route path='/new/contacts' element={<AddContact />}></Route>
              <Route path='/contacts' element={<Contacts />}></Route>
              <Route path='/contacts/:contactId' element={<ContactDetails />}></Route>
              <Route path='/edit/contacts/:contactId' element={<EditContact />}></Route>
              <Route path='*' element={<NotFound />}></Route>
            </Routes>
          </Container>
      </BrowserRouter>
    </>
  );
};

export default App;