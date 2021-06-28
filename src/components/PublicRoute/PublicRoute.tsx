import { ROUTES } from 'constants/routes';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IsAdminUser } from 'utils/token.utils';

const PublicRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
  const { isAuthenticated, getUserSession } = useAuth();

  if (!isAuthenticated()) {
    return <Route {...routeProps} />;
  }

  const route = IsAdminUser(getUserSession()) ? ROUTES.dashboard : ROUTES.merchantDashboard;

  return <Redirect to={{ pathname: route }} />;
};

export default PublicRoute;
