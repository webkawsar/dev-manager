import { ADD_PROFILE, LOADED_USER_AND_CONTACTS } from "./action.types";

export const userInitialState = {
  loaded: false,
  userContacts: [],
  userProfile: {},
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADED_USER_AND_CONTACTS:
      return {
        ...state,
        loaded: true,
        userContacts: payload.userContacts,
        userProfile: payload.userProfile,
      };

    case ADD_PROFILE:
      return {
        ...state,
        userProfile: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
