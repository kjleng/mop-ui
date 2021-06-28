import Layout from 'components/Layout/Layout';
import MaterialUiTheme from 'components/MaterialUiTheme/MaterialUiTheme';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { ROUTES } from 'constants/routes';
import { AuthProvider } from 'contexts/AuthContext';
import Roles from 'enums/roles.enum';
import {
  Dashboard,
  Forbidden,
  MerchantDetailsPage,
  Login,
  MerchantDashboard,
  QuestionnairePage,
  UploadLogoPage,
  PageNotFound,
  FormTest,
} from 'pages';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const adminOnly = [Roles.Admin];
const allRoles = [Roles.Admin, Roles.Merchant];

function App() {
  return (
    <AuthProvider>
      <MaterialUiTheme>
        <Suspense fallback="loading">
          <Layout>
            <Switch>
              <PublicRoute path="/" exact render={() => <Redirect to={ROUTES.login} />} />
              <PublicRoute exact path={ROUTES.login} component={Login} />
              <ProtectedRoute exact path={ROUTES.formTest} component={FormTest} />
              <ProtectedRoute
                exact
                path={ROUTES.dashboard}
                component={Dashboard}
                allowedRoles={adminOnly}
              />
              <ProtectedRoute
                exact
                path={ROUTES.merchantDetails}
                component={MerchantDetailsPage}
                allowedRoles={allRoles}
              />
              <ProtectedRoute
                exact
                path={ROUTES.merchantDashboard}
                component={MerchantDashboard}
                allowedRoles={allRoles}
              />
              <ProtectedRoute
                exact
                path={ROUTES.merchantQuestionnaire}
                component={QuestionnairePage}
                allowedRoles={allRoles}
              />
              <ProtectedRoute
                exact
                path={ROUTES.uploadLogo}
                component={UploadLogoPage}
                allowedRoles={allRoles}
              />
              <ProtectedRoute exact path={ROUTES.forbidden} component={Forbidden} />
              <Route component={PageNotFound} />
            </Switch>
          </Layout>
        </Suspense>
      </MaterialUiTheme>
    </AuthProvider>
  );
}

export default App;
