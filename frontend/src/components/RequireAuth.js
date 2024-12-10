import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if token is not found
      }
    }, [navigate]);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default RequireAuth;
