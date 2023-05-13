import {
  ADD_PROFILE,
  DELETE_CONTACT,
  LOAD_USER_CONTACTS,
  LOAD_USER_PROFILE,
} from "./action.types";

export const userInitialState = {
  loadedProfile: false,
  loadedContacts: false,
  userContacts: [],
  userProfile: {},
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER_PROFILE:
      return {
        ...state,
        loadedProfile: true,
        userProfile: payload,
      };

    case LOAD_USER_CONTACTS:
      return {
        ...state,
        loadedContacts: true,
        userContacts: payload,
      };

    case ADD_PROFILE:
      return {
        ...state,
        userProfile: payload,
      };

    case DELETE_CONTACT:
      const filteredContacts = state.userContacts.filter(
        (contact) => contact.id !== action.payload
      );
      return {
        ...state,
        userContacts: filteredContacts,
      };
    default:
      return state;
  }
};

export default userReducer;
