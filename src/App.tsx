import { Redirect, Route, Switch } from "react-router-dom";
import { Suspense } from "react";
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout/Layout";
import {
  DashboardPage, AnotherPage
} from "./pages";

function App() {
  return (
    <Suspense fallback="loading">
      <Layout>
        <Switch>
          <Route path="/" exact render={() => <Redirect to={ROUTES.dashboard} />} />
          <Route exact path={ROUTES.dashboard} component={DashboardPage} />
          <Route exact path={ROUTES.another} component={AnotherPage} />
        </Switch>
      </Layout>
    </Suspense >
  );
}

export default App;
