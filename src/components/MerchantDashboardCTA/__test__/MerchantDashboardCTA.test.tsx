// check that header text and body text is rendered as expected

import React from 'react';
import MerchantDashboardCTA from '../MerchantDashboardCTA';
import { cleanup, render, act } from '@testing-library/react';

afterEach(cleanup);

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

describe('Unit Tests', () => {
  test('render_MerchantDashboardCTA_DisplaysDesiredText', () => {
    const headerText = 'header text';
    const bodyText = 'body text';
    const { queryByText } = render(
      <MerchantDashboardCTA HeaderText={headerText} BodyText={bodyText} LinkText="" LinkPath="" />
    );

    const renderedHeaderText = queryByText(headerText);
    const renderedBodyText = queryByText(bodyText);
    expect(renderedHeaderText).toBeInTheDocument();
    expect(renderedBodyText).toBeInTheDocument();

    // the tests or the button in this component is covered by FSButton.test.tsx
  });
});
