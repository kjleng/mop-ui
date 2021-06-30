import { cleanup, render, screen } from '@testing-library/react';
import MaterialUiTheme from 'components/MaterialUiTheme/MaterialUiTheme';
import MerchantDetailPage from 'pages/admin/merchant-details/merchant-details';
import React from 'react';

const mockMerchantName = `Test Name this should never ever collide with anything real`;

// Mock Params from react-router-dom to read
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    merchantName: mockMerchantName,
  }),
  useRouteMatch: () => ({ url: `/merchant-details/${mockMerchantName}` }),
}));

jest.mock('react-i18next');

const getUsers = jest.fn();

describe('Merchant Details page', () => {
  afterEach(cleanup);

  it(`should show skeletons and correct Merchant Name`, () => {
    render(
      <MaterialUiTheme>
        <MerchantDetailPage />
      </MaterialUiTheme>
    );

    const h1 = screen.queryByTestId(`h1`);
    const skeletons = screen.queryAllByTestId(`skeletons`);
    const errorMessage = screen.queryByTestId(`error-message`);
    const users = screen.queryAllByTestId(`user`);

    expect(skeletons.length).toBe(3);
    expect(h1?.textContent).toBe(mockMerchantName);
    skeletons.forEach((skeleton) => expect(skeleton).toBeInTheDocument());
    expect(getUsers).toBeCalledTimes(0);
    expect(errorMessage).not.toBeInTheDocument();
    expect(users.length).toBe(0);
  });
});
