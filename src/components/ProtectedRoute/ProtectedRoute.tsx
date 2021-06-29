import { ROUTES } from 'constants/routes';
import Roles from 'enums/roles.enum';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { GetUserRole } from 'utils/token.utils';

interface ProtectedRouteProps extends RouteProps {
  allowedRoles?: Array<Roles>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  ...routeProps
}: ProtectedRouteProps) => {
  const { isAuthenticated, getUserSession } = useAuth();

  if (isAuthenticated()) {
    if (
      allowedRoles &&
      allowedRoles.length &&
      !allowedRoles.includes(GetUserRole(getUserSession()))
    ) {
      return <Redirect to={{ pathname: ROUTES.forbidden }} />;
    }

    return <Route {...routeProps} />;
  }

  return <Redirect to={{ pathname: ROUTES.login }} />;
};

export default ProtectedRoute;
