import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlatformDetailsCompletedModal from 'components/PlatformDetailsCompletedModal/PlatformDetailsCompletedModal';
import { ROUTES } from 'constants/routes';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import { StorefrontPresentations } from 'enums/storefrontPresentations.enum';
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

jest.mock('react-i18next');

describe('<PlatformDetailsCompletedModal />', () => {
  let history: MemoryHistory;

  afterEach(cleanup);

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/modal'] });
  });

  it('should not show setup documents for Other platforms', () => {
    setup(history, EcommPlatformTypes.Other, StorefrontPresentations.LUMA);

    expect(screen.queryByText(/Our e-comm team will follow up/)).toBeInTheDocument();
    expect(screen.queryByText(/Please review the following PDFs/)).not.toBeInTheDocument();
  });

  it('should show setup documents for Shopify/Magento platforms', () => {
    setup(history, EcommPlatformTypes.Shopify, StorefrontPresentations.LUMA);

    expect(screen.queryByText(/Please review the following PDFs/)).toBeInTheDocument();
    expect(screen.queryByText(/Our e-comm team will follow up/)).not.toBeInTheDocument();
  });

  it('redirects to the merchant details page once closed', () => {
    setup(history, EcommPlatformTypes.Other, StorefrontPresentations.LUMA);

    const doneButton = screen.getByText('Done');
    expect(doneButton).toBeInTheDocument();

    userEvent.click(doneButton);

    expect(history.location.pathname).toBe(ROUTES.merchantDetails);
    expect(screen.queryByText('Merchant Details')).toBeInTheDocument();
  });
});

const setup = (
  history: MemoryHistory,
  platformType: EcommPlatformTypes,
  storefrontType: StorefrontPresentations
) =>
  render(
    <Router history={history}>
      <Switch>
        <Route exact path={ROUTES.merchantDetails} component={() => <div>Merchant Details</div>} />
        <Route
          exact
          path="/modal"
          component={() => (
            <PlatformDetailsCompletedModal
              isOpen={true}
              platformType={platformType}
              storefrontPresentationType={storefrontType}
            />
          )}
        />
      </Switch>
    </Router>
  );
