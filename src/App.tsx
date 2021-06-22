import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { AuthProvider } from 'contexts/AuthContext';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MaterialUiTheme from './components/MaterialUiTheme/MaterialUiTheme';
import { ROUTES } from './constants/routes';
import {
  Dashboard,
  AnotherPage,
  MerchantDetailsPage,
  Login,
  MerchantDashboard,
  QuestionnairePage,
  UploadLogoPage,
} from './pages';

function App() {
  return (
    <AuthProvider>
      <MaterialUiTheme>
        <Suspense fallback="loading">
          <Layout>
            <Switch>
              <Route path="/" exact render={() => <Redirect to={ROUTES.dashboard} />} />
              <PublicRoute exact path={ROUTES.login} component={Login} />
              <ProtectedRoute exact path={ROUTES.dashboard} component={Dashboard} />
              <ProtectedRoute exact path={ROUTES.another} component={AnotherPage} />
              <ProtectedRoute exact path={ROUTES.merchantDetails} component={MerchantDetailsPage} />
              <ProtectedRoute exact path={ROUTES.merchantDashboard} component={MerchantDashboard} />
              <ProtectedRoute exact path={ROUTES.questionnaire} component={QuestionnairePage} />
              <ProtectedRoute exact path={ROUTES.uploadLogo} component={UploadLogoPage} />
            </Switch>
          </Layout>
        </Suspense>
      </MaterialUiTheme>
    </AuthProvider>
  );
}

export default App;
