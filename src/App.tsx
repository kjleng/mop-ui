import { makeStyles } from '@material-ui/core/styles';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ROUTES } from './constants/routes';

import { DashboardPage, AnotherPage, MerchantDetailsPage } from './pages';

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily: 'Sans Pro',
    },
  }));
  const classes = useStyles();
  return (
    <Suspense fallback="loading">
      <Layout>
        <Switch>
          <Route path="/" exact render={() => <Redirect to={ROUTES.dashboard} />} />
          <Route exact path={ROUTES.dashboard} component={DashboardPage} />
          <Route exact path={ROUTES.another} component={AnotherPage} />
          <Route exact path={ROUTES.merchantDetails} component={MerchantDetailsPage} />
        </Switch>
      </Layout>
    </Suspense>
  );
}

export default App;
