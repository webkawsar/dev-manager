import { createContext, useContext } from "react";
import { axiosPrivateInstance } from "../config/axios";
import { AuthContext } from "./Auth.context";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);
  const [userContacts, setUserContacts] = useState([]);
  const [profileId, setProfileId] = useState(null);

  const loadUserProfile = async () => {
    const query = qs.stringify(
      {
        // populate: "*",
        // populate: ["profilePicture", "user"],
        // populate: {
        //   user: {
        //     populate: ["contacts", "profile"],
        //   },
        // },
        populate: ["profilePicture", "user", "user.contacts", "user.profile"],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    try {
      const response = await axiosPrivateInstance(token).get(
        `/profiles/${profileId}?${query}`
      );
      console.log(response.data.data, "loadUserProfile response");

      // const mappedContacts =
      //   response?.data?.data?.attributes?.user?.data?.attributes?.contacts?.data.map(
      //     (contact) => formateContact(contact)
      //   );

      // setUserContacts(mappedContacts);
    } catch (error) {
      console.log(error, "loadUserProfile error");
    }
  };

  const loadUserContacts = async () => {
    const query = qs.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    try {
      const response = await axiosPrivateInstance(token).get(
        `/users/me?${query}`
      );
      // console.log(response.data, "loadUserContacts response");

      setProfileId(response.data.profile.id);
      // setUserContacts(response.data.contacts);
      setLoaded(true);
    } catch (error) {
      console.log(error?.response?.data?.error, "loadUserContacts error");
      setLoaded(true);
    }
  };

  const value = { loadUserProfile };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
