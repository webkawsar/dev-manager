import qs from "qs";
import { createContext, useContext, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formateContact";
import { AuthContext } from "./Auth.context";
import userReducer, { userInitialState } from "./User.reducer";
import { ADD_PROFILE, LOADED_USER_AND_CONTACTS } from "./action.types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [{ loaded, userContacts, userProfile }, dispatch] = useReducer(
    userReducer,
    userInitialState
  );

  const navigate = useNavigate();
  const location = useLocation();

  const createUserProfile = async (data) => {
    const { profilePicture, ...restData } = data;

    const formData = new FormData();
    if (profilePicture.length) {
      formData.append(
        "files.profilePicture",
        profilePicture[0],
        profilePicture[0]?.name
      );
    }
    formData.append("data", JSON.stringify(restData));

    try {
      const response = await axiosPrivateInstance(token).post(
        "/profiles",
        formData
      );

      console.log(response.data, "createUserProfile response");

      const formattedData = formateContact(response?.data?.data);
      dispatch({ type: ADD_PROFILE, payload: formattedData });

      console.log(formattedData, "formattedData");
    } catch (error) {
      console.log(error, "createUserProfile error");
    }
  };

  const loadUserProfile = async () => {
    const query = qs.stringify(
      {
        populate: [
          "contacts",
          "profile",
          "contacts.author",
          "contacts.image",
          "profile.profilePicture",
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    try {
      const response = await axiosPrivateInstance(token).get(
        `/users/me?${query}`
      );

      // save data tp reducer state
      dispatch({
        type: LOADED_USER_AND_CONTACTS,
        payload: {
          userContacts: response.data?.contacts,
          userProfile: response.data?.profile,
        },
      });
    } catch (error) {
      toast.error("loadUserProfile error");
    }
  };

  const updateUserProfile = (data) => {
    console.log("Update user profile api call hobe");
  };

  const value = {
    loaded,
    userProfile,
    userContacts,
    createUserProfile,
    updateUserProfile,
    loadUserProfile,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
