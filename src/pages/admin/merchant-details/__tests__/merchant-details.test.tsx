import { cleanup, render } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { render as ReactRender } from 'react-dom';
import { act } from 'react-dom/test-utils';
import MaterialUiTheme from '../../../../components/MaterialUiTheme/MaterialUiTheme';
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

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            return undefined;
          }),
      },
    };
  },
}));

const getUsers = jest.fn();

test(`Merchant Details Page -- Skeletons show on load & H1 shows correct Merchant Name`, () => {
  const { queryByTestId, queryAllByTestId, debug } = render(
    <MaterialUiTheme>
      <MerchantDetailPage />
    </MaterialUiTheme>
  );
  const h1 = queryByTestId(`h1`);
  const skeletons = queryAllByTestId(`skeletons`);
  const errorMessage = queryByTestId(`error-message`);
  const users = queryAllByTestId(`user`);
  expect(skeletons.length).toBe(3);
  expect(h1?.textContent).toBe(mockMerchantName);
  skeletons.forEach((skeleton) => expect(skeleton).toBeInTheDocument());
  expect(getUsers).toBeCalledTimes(0);
  expect(errorMessage).not.toBeInTheDocument();
  expect(users.length).toBe(0);
});
