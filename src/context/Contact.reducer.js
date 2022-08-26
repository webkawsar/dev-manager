import { ADD_CONTACT, DELETE_CONTACT, LOAD_CONTACTS, UPDATE_CONTACT } from "./action.types";



const contactsReducer = (state, action) => {

    const {type, payload} = action;
  
    switch (type) {
      case ADD_CONTACT:
        return [payload, ...state];
    
      case UPDATE_CONTACT:
        const updatedContact = state.map(contact => {
          if(contact.id === payload.id) {
              return payload;
          } else {
              return contact;
          }
        })
        return [...updatedContact];
    
      case DELETE_CONTACT:
        const filteredContacts = state.filter(contact => contact.id !== payload);
        return [...filteredContacts];

      case LOAD_CONTACTS:
        return [...payload];
  
      default:
        return state;
    }
  }


export default contactsReducer;











