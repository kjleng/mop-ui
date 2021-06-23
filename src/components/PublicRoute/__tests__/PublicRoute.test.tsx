import { cleanup, render, screen } from '@testing-library/react';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { ROUTES } from 'constants/routes';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

let mockIsAuthenticated = jest.fn();
jest.mock('hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
  }),
}));

afterEach(cleanup);

describe('<PublicRoute/>', () => {
  it('redirects authenticated users to dashboard route', async () => {
    mockIsAuthenticated = jest.fn().mockReturnValue(true);
    const history = createMemoryHistory({ initialEntries: ['/public'] });

    setup(history);

    expect(history.location.pathname).toBe(ROUTES.dashboard);
    expect(screen.queryByText('Public')).not.toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).toBeInTheDocument();
  });

  it('allows unauthenticated users to access the public route', async () => {
    mockIsAuthenticated = jest.fn().mockReturnValue(false);
    const history = createMemoryHistory({ initialEntries: ['/public'] });

    setup(history);

    expect(history.location.pathname).toBe('/public');
    expect(screen.queryByText('Public')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });
});

const setup = (history: MemoryHistory) =>
  render(
    <Router history={history}>
      <Switch>
        <Route exact path={ROUTES.dashboard} component={() => <div>Dashboard</div>} />
        <PublicRoute exact path="/public" component={() => <div>Public</div>} />
      </Switch>
    </Router>
  );
