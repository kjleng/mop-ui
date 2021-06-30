import { cleanup, render, screen } from '@testing-library/react';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from 'constants/routes';
import Roles from 'enums/roles.enum';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import * as utils from 'utils/token.utils';

const mockIsAuthenticated = jest.fn();
const mockGetUserSession = jest.fn();
const mockGetUserRole = jest.spyOn(utils, 'GetUserRole');

jest.mock('hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
    getUserSession: mockGetUserSession,
  }),
}));

describe('<ProtectedRoute />', () => {
  let history: MemoryHistory;

  afterEach(cleanup);

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/protected'] });
  });

  it('redirects unauthenticated users to login route', async () => {
    mockIsAuthenticated.mockReturnValue(false);

    setup(history);

    expect(history.location.pathname).toBe(ROUTES.login);
    expect(screen.queryByText('Protected')).not.toBeInTheDocument();
    expect(screen.queryByText('Public')).toBeInTheDocument();
  });

  it('allows authenticated users to access the private route', async () => {
    mockIsAuthenticated.mockReturnValue(true);

    setup(history);

    expect(history.location.pathname).toBe('/protected');
    expect(screen.queryByText('Protected')).toBeInTheDocument();
    expect(screen.queryByText('Public')).not.toBeInTheDocument();
  });

  it('allows authenticated users with allowed roles access to the private route', async () => {
    mockIsAuthenticated.mockReturnValue(true);
    mockGetUserRole.mockReturnValue(Roles.Admin);

    setup(history, [Roles.Admin]);

    expect(history.location.pathname).toBe('/protected');
    expect(screen.queryByText('Protected')).toBeInTheDocument();
  });

  it('forbids authenticated users without allowed roles access to the private route', async () => {
    mockIsAuthenticated.mockReturnValue(true);
    mockGetUserRole.mockReturnValue(Roles.Merchant);

    setup(history, [Roles.Admin]);

    expect(history.location.pathname).toBe(ROUTES.forbidden);
    expect(screen.queryByText('Forbidden')).toBeInTheDocument();
  });
});

const setup = (history: MemoryHistory, allowedRoles?: Array<Roles>) =>
  render(
    <Router history={history}>
      <Switch>
        <Route exact path={ROUTES.login} component={() => <div>Public</div>} />
        <Route exact path={ROUTES.forbidden} component={() => <div>Forbidden</div>} />
        <ProtectedRoute
          exact
          path="/protected"
          component={() => <div>Protected</div>}
          allowedRoles={allowedRoles}
        />
      </Switch>
    </Router>
  );
