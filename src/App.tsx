import { Redirect, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout/Layout";
import { makeStyles } from '@material-ui/core/styles';

import {
  DashboardPage, AnotherPage
} from "./pages";
import { SnackbarProvider } from 'notistack';
function App() {
  const useStyles = makeStyles(theme => ({
    root: {
      fontFamily: "Sans Pro"
    }
  }));
  const classes = useStyles();
  return (
    <Suspense fallback="loading">
      <Layout>
        {/* <SnackbarProvider maxSnack={1}
          classes={{
            root: classes.root
          }}> */}

          <Switch>
            <Route path="/" exact render={() => <Redirect to={ROUTES.dashboard} />} />
            <Route exact path={ROUTES.dashboard} component={DashboardPage} />
            <Route exact path={ROUTES.another} component={AnotherPage} />
          </Switch>
        {/* </SnackbarProvider> */}
      </Layout>
    </Suspense >
  );
}

export default App;
