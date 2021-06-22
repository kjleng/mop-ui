import { ROUTES } from 'constants/routes';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
  const auth = useAuth();

  if (auth.isAuthenticated()) {
    return <Route {...routeProps} />;
  }

  return <Redirect to={{ pathname: ROUTES.login }} />;
};

export default ProtectedRoute;
