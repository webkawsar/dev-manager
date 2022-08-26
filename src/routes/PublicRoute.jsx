import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';




const PublicRoute = ({children}) => {
    
    const location = useLocation();
    const {user} = useContext(AuthContext);
    const loadedComponent = user ? <Navigate to={location?.state?.from ? location?.state?.from : '/contacts'} /> : children;

    return (
        <>
           {loadedComponent} 
        </>
    );
};

export default PublicRoute;