import { Redirect, Route, Switch } from "react-router-dom";
import {ThemeProvider} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles'
import { ROUTES } from "./constants/routes";
import Layout from "./components/Layout/Layout";
import {
  HomePage, AnotherPage, Dashboard
} from "./pages";

const theme = createMuiTheme({
  palette: {
    text: {
      primary: `#000`
    }
  },
  typography: {
    fontFamily: "Source Sans Pro, sans-serif",
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Switch>
          <Route path="/" exact render={() => <Redirect to={ROUTES.home} />} />
          <Route exact path={ROUTES.home} component={HomePage} />
          <Route exact path={ROUTES.another} component={AnotherPage} />
          <Route exact path={ROUTES.dashboard} component={Dashboard} />
          <Route path={ROUTES.merchant} component={AnotherPage} />
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
