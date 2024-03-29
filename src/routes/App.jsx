import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../App.css";
import Header from "../layouts/Header";
import AddContact from "../pages/AddContact";
import ContactDetails from "../pages/ContactDetails";
import Contacts from "../pages/Contacts";
import Dashboard from "../pages/Dashboard";
import EditContact from "../pages/EditContact";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ManagePassword from "../pages/ManagePassword";
import NotFound from "../pages/NotFound";
import Playground from "../pages/Playground";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import UserContacts from "../pages/UserContacts";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

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
      <Container style={{ margin: "0 auto" }} className="mt-3">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>

          <Route
            path="/new/contacts"
            element={
              <PrivateRoute>
                <AddContact />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/contacts/:contactId"
            element={
              <PrivateRoute>
                <ContactDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/edit/contacts/:contactId"
            element={
              <PrivateRoute>
                <EditContact />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-password" element={<ManagePassword />} />
            <Route path="contacts" element={<UserContacts />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/playground" element={<Playground />} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </>
  );
};

export default App;
