import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogoutButton from 'components/LogoutButton/LogoutButton';
import { ROUTES } from 'constants/routes';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

jest.mock('react-i18next');

const mockSignOut = jest.fn();
const mockIsAuthenticated = jest.fn();
jest.mock('hooks/useAuth', () => ({
  useAuth: () => ({
    signOut: mockSignOut,
    isAuthenticated: mockIsAuthenticated,
  }),
}));

describe('<LogoutButton />', () => {
  afterEach(cleanup);

  it('should return Logout button if user is authenticated', async () => {
    mockIsAuthenticated.mockReturnValue(true);
    render(<LogoutButton />);

    expect(screen.queryByText('Logout')).toBeInTheDocument();
  });

  it('should return null if user is not authenticated', async () => {
    mockIsAuthenticated.mockReturnValue(false);
    render(<LogoutButton />);

    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should call signOut and redirect to login page when clicked', async () => {
    mockIsAuthenticated.mockReturnValue(true);
    const history = createMemoryHistory({ initialEntries: ['/dashboard'] });

    render(
      <Router history={history}>
        <Switch>
          <Route exact path={ROUTES.login} component={() => <div>Login</div>} />
          <Route exact path="/dashboard" component={() => <LogoutButton />} />
        </Switch>
      </Router>
    );

    const logoutBtn = screen.getByText('Logout');
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);

    expect(mockSignOut).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toBe(ROUTES.login);
  });
});
