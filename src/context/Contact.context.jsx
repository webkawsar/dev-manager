import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formateContact";
import { ADD_CONTACT, DELETE_CONTACT, LOAD_CONTACTS, UPDATE_CONTACT } from "./action.types";
import { AuthContext } from "./Auth.context";
import contactsReducer from "./Contact.reducer";


// create a context
export const ContactContext = createContext();

  
// create a provider
export const ContactProvider = ({children}) => {

  const { user } = useContext(AuthContext);
  const [contacts, dispatch] = useReducer(contactsReducer, []);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    loadContacts();
    
  }, [])

  const loadContacts = async() => {

    try {

      const response = await axiosPrivateInstance.get('/contacts');
      const mappedContacts = response?.data?.data?.map(contact => formateContact(contact));
      
      dispatch({type: LOAD_CONTACTS, payload: mappedContacts});
      setLoaded(true);
      
    } catch (error) {
      
      console.log(error?.response?.data?.error, 'loadContacts error');
      setLoaded(true);
    }
  }

  const addContact = async(contact) => {
    
    try {

      const response = await axiosPrivateInstance.post('/contacts', {
        data: contact
      });

      const formattedContact = formateContact(response?.data?.data);
      dispatch({type: ADD_CONTACT, payload: formattedContact});
      
      // show flash message
      toast.success('Contact added successfully');

      // redirect to user
      navigate('/contacts');
      
    } catch (error) {
      
      console.log(error?.response?.data?.error, 'addContact error');
      toast.error(error?.response?.data?.error?.message);
    }
  }

  const updateContact = (updatedContactValue) => {
      dispatch({type: UPDATE_CONTACT, payload: updatedContactValue});
  }

  const deleteContact = async(id) => {
    try {

      const response = await axiosPrivateInstance.delete(`/contacts/${id}`);
      dispatch({type: DELETE_CONTACT, payload: response?.data?.data?.id});

      // show flash message
      toast.success('Contact delete successfully');

      // redirect to user
      navigate('/contacts');
      
    } catch (error) {
      
      console.log(error?.response?.data?.error, 'deleteContact error');
      toast.error(error?.response?.data?.error?.message);
    }
  }

  const value = {
      loaded,
      contacts,
      addContact,
      updateContact,
      deleteContact
  }

  return (
    <ContactContext.Provider value={value}>
        {children}
    </ContactContext.Provider>
  )
}



























