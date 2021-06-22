import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MaterialUiTheme from './components/MaterialUiTheme/MaterialUiTheme';
import { ROUTES } from './constants/routes';
import {
  Dashboard,
  AnotherPage,
  MerchantDetailsPage,
  MerchantDashboard,
  QuestionnairePage,
  UploadLogoPage,
} from './pages';

function App() {
  return (
    <MaterialUiTheme>
      <Suspense fallback="loading">
        <Layout>
          <Switch>
            <Route path="/" exact render={() => <Redirect to={ROUTES.dashboard} />} />
            <Route exact path={ROUTES.dashboard} component={Dashboard} />
            <Route exact path={ROUTES.another} component={AnotherPage} />
            <Route exact path={ROUTES.merchantDetails} component={MerchantDetailsPage} />
            <Route exact path={ROUTES.merchantDashboard} component={MerchantDashboard} />
            <Route exact path={ROUTES.questionnaire} component={QuestionnairePage} />
            <Route exact path={ROUTES.uploadLogo} component={UploadLogoPage} />
            <Route exact path={ROUTES.merchantDashboard} component={MerchantDashboard} />
          </Switch>
        </Layout>
      </Suspense>
    </MaterialUiTheme>
  );
}

export default App;
