import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/Auth.context';







const PrivateRoute = ({children}) => {
    
    const location = useLocation();
    const {user} = useContext(AuthContext);
    const loadedComponent = user ? children : <Navigate to='/login' state={{from: location.pathname}} />

    return (
        <>
            {loadedComponent}
        </>
    );
};

export default PrivateRoute;