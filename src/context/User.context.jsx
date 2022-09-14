import qs from "qs";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivateInstance } from "../config/axios";
import { AuthContext } from "./Auth.context";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [userContacts, setUserContacts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //   useEffect(() => {
  //     loadUserContacts;
  //     console.log("User context called in mounting stage");
  //   }, []);

  const createUserProfile = async (data) => {
    const { profilePicture, ...restData } = data;
    const formData = new FormData();
    formData.append(
      "profilePicture",
      profilePicture[0],
      profilePicture[0]?.name
    );
    formData.append("data", JSON.stringify(restData));

    try {
      const response = await axiosPrivateInstance(token).post(
        "/profiles",
        formData
        // {
        //   onUploadProgress: (progress) => {
        //     const percentage = uploadPercentage(
        //       progress.total,
        //       progress.loaded
        //     );
        //     setPercentage(percentage);
        //   },
        // }
      );

      console.log(response.data, "createUserProfile response");
      setUserProfile(response?.data);
    } catch (error) {
      console.log(error, "createUserProfile error");
    }
  };

  //   const loadUserProfile = async () => {
  //     const query = qs.stringify(
  //       {
  //         // populate: "*",
  //         // populate: ["profilePicture", "user"],
  //         // populate: {
  //         //   user: {
  //         //     populate: ["contacts", "profile"],
  //         //   },
  //         // },
  //         populate: ["profilePicture", "user", "user.contacts", "user.profile"],
  //       },
  //       {
  //         encodeValuesOnly: true, // prettify URL
  //       }
  //     );

  //     try {
  //       const response = await axiosPrivateInstance(token).get(
  //         `/profiles/${profileId}?${query}`
  //       );
  //       console.log(response.data.data, "loadUserProfile response");

  //       // const mappedContacts =
  //       //   response?.data?.data?.attributes?.user?.data?.attributes?.contacts?.data.map(
  //       //     (contact) => formateContact(contact)
  //       //   );

  //       // setUserContacts(mappedContacts);
  //     } catch (error) {
  //       console.log(error, "loadUserProfile error");
  //     }
  //   };

  const loadUserProfile = async () => {
    const query = qs.stringify(
      {
        populate: [
          "contacts",
          "profile",
          "contacts.author",
          "contacts.image",
          "profile.profilePicture",
          "profile.user",
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
      //   console.log(response.data, "loadUserProfile response");

      setUserProfile(response?.data?.profile);
      setUserContacts(response?.data?.contacts);
      setLoaded(true);
    } catch (error) {
      console.log(error?.response?.data?.error, "loadUserProfile error");
      setLoaded(true);
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
    loadUserProfile,
    updateUserProfile,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
