import { Redirect, Route, Switch } from "react-router-dom";

import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout/Layout";
import {
  HomePage, AnotherPage
} from "./pages";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact render={() => <Redirect to={ROUTES.home} />} />
        <Route exact path={ROUTES.home} component={HomePage} />
        <Route exact path={ROUTES.another} component={AnotherPage} />
      </Switch>
    </Layout>
  );
}

export default App;
