import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../config/axios";




export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const registerUser = async(data) => {

        try {
            const response = await axiosInstance.post('/auth/local/register', data);
            const {jwt, user} = response.data;

            // update state
            setUser(user);
            setToken(jwt);

            // set data to local storage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(jwt));

        } catch (error) {
            toast.error(error?.response?.data?.error?.message)
        }
    }

    const login = (data) => {

    }

    const logout = () => {


    }

    const value = {
        user,
        token,
        registerUser,
        login, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
























