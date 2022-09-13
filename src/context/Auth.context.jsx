import qs from "qs";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance, axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formateContact";

export const AuthContext = createContext();

const storageUser = JSON.parse(localStorage.getItem("user"));
const storageToken = JSON.parse(localStorage.getItem("token"));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storageUser ? storageUser : null);
  const [token, setToken] = useState(storageToken ? storageToken : null);
  const [userContacts, setUserContacts] = useState([]);
  const [profileId, setProfileId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // load user contact
  useEffect(() => {
    if (token) {
      loadUserContacts();
    }
  }, [token, triggerDelete]);

  // load user profile
  useEffect(() => {
    if (token && loaded) {
      loadUserProfile();
    }
  }, [token, loaded]);

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

      const mappedContacts =
        response?.data?.data?.attributes?.user?.data?.attributes?.contacts?.data.map(
          (contact) => formateContact(contact)
        );

      setUserContacts(mappedContacts);
    } catch (error) {
      console.log(error, "error");
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

  const registerUser = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/local/register", data);

      // show success msg
      toast.success(
        "Registration is successful! please check email and confirm to click the link"
      );
    } catch (error) {
      console.log(error, "registerUser error");
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const login = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/local", data);
      const { jwt, user } = response.data;

      // update state
      setUser(user);
      setToken(jwt);

      // set data to local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      // show success msg
      toast.success("Login successful");

      // redirect the user
      navigate(location?.state?.from ? location?.state?.from : "/contacts");
    } catch (error) {
      console.log(error, "login error");
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const logout = () => {
    //remove data from storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // remove data from state
    setUser(null);
    setToken(null);

    // show logout msg
    toast.success("Logout successful");

    // redirect the user
    navigate("/login");
  };

  const changePassword = async (data) => {
    try {
      const response = await axiosPrivateInstance(token).post(
        "/auth/change-password",
        {
          currentPassword: data.currentPassword,
          password: data.newPassword,
          passwordConfirmation: data.confirmPassword,
        }
      );
      const { jwt, user } = response.data;

      // update state
      setUser(user);
      setToken(jwt);

      // set data to local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      // show success msg
      toast.success("Password changed successfully");

      // redirect the user to profile
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error?.response?.data?.error, "change password error");
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const value = {
    user,
    userContacts,
    setTriggerDelete,
    loaded,
    token,
    registerUser,
    login,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
