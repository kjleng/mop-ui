import { ROUTES } from 'constants/routes';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = ({ ...routeProps }: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Route {...routeProps} />;
  }

  return <Redirect to={{ pathname: ROUTES.login }} />;
};

export default ProtectedRoute;
