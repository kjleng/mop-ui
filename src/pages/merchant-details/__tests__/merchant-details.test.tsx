import { cleanup, render } from '@testing-library/react';
import React from 'react';
import MaterialUiTheme from '../../../components/MaterialUiTheme/MaterialUiTheme';
import MerchantDetailPage from '../merchant-details';

afterEach(cleanup);

const mockMerchantName = `Test Name this should never ever collide with anything real`;

// Mock Params from react-router-dom to read
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    merchantName: mockMerchantName,
  }),
  useRouteMatch: () => ({ url: `/merchant-details/${mockMerchantName}` }),
}));

const getUsers = jest.fn();

jest.spyOn(React, `useEffect`).mockImplementation(getUsers);

const { queryByTestId, queryAllByTestId } = render(
  <MaterialUiTheme>
    <MerchantDetailPage getUsers={getUsers} />
  </MaterialUiTheme>
);

test(`Merchant Details Page`, () => {
  const h1 = queryByTestId(`h1`);
  const skeletons = queryAllByTestId(`skeletons`);
  expect(h1?.textContent).toBe(mockMerchantName);
  skeletons.forEach((skeleton) => expect(skeleton).toBeInTheDocument());
  expect(getUsers).toBeCalledTimes(0);
});
