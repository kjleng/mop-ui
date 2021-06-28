import { cleanup, render, screen } from '@testing-library/react';
import PublicRoute from 'components/PublicRoute/PublicRoute';
import { ROUTES } from 'constants/routes';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import * as utils from 'utils/token.utils';

const mockIsAuthenticated = jest.fn();
const mockGetUserSession = jest.fn();
const mockIsAdminUser = jest.spyOn(utils, 'IsAdminUser');

jest.mock('hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
    getUserSession: mockGetUserSession,
  }),
}));

afterEach(cleanup);

describe('<PublicRoute/>', () => {
  it('redirects authenticated admin users to admin dashboard route', () => {
    mockIsAuthenticated.mockReturnValue(true);
    mockIsAdminUser.mockReturnValue(true);
    const history = createMemoryHistory({ initialEntries: ['/public'] });

    setup(history);

    expect(history.location.pathname).toBe(ROUTES.dashboard);
    expect(screen.queryByText('Public')).not.toBeInTheDocument();
    expect(screen.queryByText('Admin Dashboard')).toBeInTheDocument();
  });

  it('redirects authenticated merchant users to merchant dashboard route', () => {
    mockIsAuthenticated.mockReturnValue(true);
    mockIsAdminUser.mockReturnValue(false);
    const history = createMemoryHistory({ initialEntries: ['/public'] });

    setup(history);

    expect(history.location.pathname).toBe(ROUTES.merchantDashboard);
    expect(screen.queryByText('Public')).not.toBeInTheDocument();
    expect(screen.queryByText('Merchant Dashboard')).toBeInTheDocument();
  });

  it('allows unauthenticated users to access the public route', () => {
    mockIsAuthenticated.mockReturnValue(false);
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
        <Route exact path={ROUTES.dashboard} component={() => <div>Admin Dashboard</div>} />
        <Route
          exact
          path={ROUTES.merchantDashboard}
          component={() => <div>Merchant Dashboard</div>}
        />
        <PublicRoute exact path="/public" component={() => <div>Public</div>} />
      </Switch>
    </Router>
  );
