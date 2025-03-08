import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected = ({ isLoggedIn, children }) => {
    console.log("protected",isLoggedIn)
    return isLoggedIn? children : <Navigate to='/' replace /> 
}

export default Protected;