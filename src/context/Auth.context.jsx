import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../config/axios";




export const AuthContext = createContext();

const storageUser = JSON.parse(localStorage.getItem('user'));
const storageToken = JSON.parse(localStorage.getItem('token'));

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(storageUser ? storageUser : null);
    const [token, setToken] = useState(storageToken ? storageToken : null);
    const navigate = useNavigate();

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

            // show success msg
            toast.success('Registration is successful');

            // redirect the user
            navigate('/contacts');

        } catch (error) {
            toast.error(error?.response?.data?.error?.message)
        }
    }

    const login = async(data) => {

        try {
            const response = await axiosInstance.post('/auth/local', data);
            const {jwt, user} = response.data;

            // update state
            setUser(user);
            setToken(jwt);

            // set data to local storage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', JSON.stringify(jwt));

            // show success msg
            toast.success('Login successful');

            // redirect the user
            navigate('/contacts');

        } catch (error) {
            
            toast.error(error?.response?.data?.error?.message)
        }

    }

    const logout = () => {

        //remove data from storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // remove data from state
        setUser(null);
        setToken(null);

        // show logout msg
        toast.success('Logout successful');

        // redirect the user
        navigate('/login');
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
























