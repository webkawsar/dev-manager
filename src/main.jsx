import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { AuthProvider } from "./context/Auth.context";
import { ContactProvider } from "./context/Contact.context";
import { UserProvider } from "./context/User.context";
import "./index.css";
import App from "./routes/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ContactProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ContactProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
