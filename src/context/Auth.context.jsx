import { createContext, useState } from "react";




export const AuthContext = createContext();


export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const register = (data) => {

    }

    const login = (data) => {

    }

    const logout = () => {


    }

    const value = {
        user,
        token,
        register,
        login, 
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
























