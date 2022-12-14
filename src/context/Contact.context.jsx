import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formateContact";
import { DELETE_CONTACT, LOAD_CONTACTS, UPDATE_CONTACT } from "./action.types";
import { AuthContext } from "./Auth.context";
import contactsReducer from "./Contact.reducer";

// create a context
export const ContactContext = createContext();

// create a provider
export const ContactProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactsReducer, []);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      loadContacts();
    }
  }, [token]);

  const loadContacts = async () => {
    try {
      const response = await axiosPrivateInstance(token).get(
        "/contacts?populate=*"
      );
      const mappedContacts = response?.data?.data?.map((contact) =>
        formateContact(contact)
      );

      dispatch({ type: LOAD_CONTACTS, payload: mappedContacts });
      setLoaded(true);
    } catch (error) {
      console.log(error?.response?.data?.error, "loadContacts error");
      // setLoaded(true);
    }
  };

  const addContact = async (contact) => {
    try {
      const { image, ...restData } = contact;
      const formData = new FormData();
      formData.append("image", image[0], image[0]?.name);
      formData.append("data", JSON.stringify(restData));

      const response = await axiosPrivateInstance(token).post(
        "/contacts",
        formData
      );

      // dispatch({ type: ADD_CONTACT, payload: response?.data });

      // show flash message
      toast.success("Contact added successfully");

      // redirect to user
      navigate("/contacts");
    } catch (error) {
      console.log(error, "addContact error");
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const updateContact = async (updatedContactValue, id) => {
    try {
      const response = await axiosPrivateInstance(token).put(
        `/contacts/${id}?populate=*`,
        {
          data: updatedContactValue,
        }
      );

      const updatedContact = formateContact(response?.data?.data);

      dispatch({ type: UPDATE_CONTACT, payload: updatedContact });

      // show flash message
      toast.success("Contact updated successfully");

      // redirect to user
      navigate(`/contacts/${updatedContact.id}`);
    } catch (error) {
      console.log(error?.response?.data?.error, "addContact error");
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await axiosPrivateInstance(token).delete(
        `/contacts/${id}`
      );
      dispatch({ type: DELETE_CONTACT, payload: response?.data?.data?.id });

      // show flash message
      toast.success("Contact delete successfully");

      // redirect to user
      navigate("/contacts");
    } catch (error) {
      console.log(error, "deleteContact error");
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const value = {
    loaded,
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
