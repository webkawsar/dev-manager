import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';




const PublicRoute = ({children}) => {
    
    const location = useLocation();
    const { user } = useSelector(state => state.auth);
    const loadedComponent = user ? <Navigate to={location?.state?.from ? location?.state?.from : '/contacts'} /> : children;

    return (
        <>
           { loadedComponent } 
        </>
    );
};

export default PublicRoute;