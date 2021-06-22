import { ROUTES } from 'constants/routes';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const PublicRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return <Route {...routeProps} />;
  }

  return <Redirect to={{ pathname: ROUTES.dashboard }} />;
};

export default PublicRoute;
