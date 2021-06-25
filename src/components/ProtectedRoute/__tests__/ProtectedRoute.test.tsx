import { cleanup, render, screen } from '@testing-library/react';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
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

describe('<ProtectedRoute/>', () => {
  it('redirects unauthenticated users to login route', async () => {
    mockIsAuthenticated = jest.fn().mockReturnValue(false);
    const history = createMemoryHistory({ initialEntries: ['/protected'] });

    setup(history);

    expect(history.location.pathname).toBe(ROUTES.login);
    expect(screen.queryByText('Protected')).not.toBeInTheDocument();
    expect(screen.queryByText('Public')).toBeInTheDocument();
  });

  it('allows authenticated users to access the private route', async () => {
    mockIsAuthenticated = jest.fn().mockReturnValue(true);
    const history = createMemoryHistory({ initialEntries: ['/protected'] });

    setup(history);

    expect(history.location.pathname).toBe('/protected');
    expect(screen.queryByText('Protected')).toBeInTheDocument();
    expect(screen.queryByText('Public')).not.toBeInTheDocument();
  });
});

const setup = (history: MemoryHistory) =>
  render(
    <Router history={history}>
      <Switch>
        <Route exact path={ROUTES.login} component={() => <div>Public</div>} />
        <ProtectedRoute exact path="/protected" component={() => <div>Protected</div>} />
      </Switch>
    </Router>
  );
