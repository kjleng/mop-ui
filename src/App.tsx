import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { AuthProvider } from 'contexts/AuthContext';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MaterialUiTheme from './components/MaterialUiTheme/MaterialUiTheme';
import { ROUTES } from './constants/routes';
import {
  AnotherPage,
  Dashboard,
  Login,
  MerchantDetailsPage,
  PageNotFound,
  FormTest,
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
              <ProtectedRoute exact path={ROUTES.formTest} component={FormTest} />
              <ProtectedRoute exact path={ROUTES.dashboard} component={Dashboard} />
              <ProtectedRoute exact path={ROUTES.another} component={AnotherPage} />
              <ProtectedRoute exact path={ROUTES.merchantDetails} component={MerchantDetailsPage} />
              <Route component={PageNotFound} />
            </Switch>
          </Layout>
        </Suspense>
      </MaterialUiTheme>
    </AuthProvider>
  );
}

export default App;
