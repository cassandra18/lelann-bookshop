import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute:React.FC<{ children: React.ReactElement }> =({ children }) => {
    const token = localStorage.getItem('authToken');
    
    const isAuthenticated = !!token;
    return isAuthenticated ? children : <Navigate to="/login" />;
  };


export default ProtectedRoute;