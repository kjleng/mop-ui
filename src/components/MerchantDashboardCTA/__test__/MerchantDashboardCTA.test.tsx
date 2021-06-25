// check that header text and body text is rendered as expected

import { cleanup, render, act } from '@testing-library/react';
import React from 'react';
import MerchantDashboardCTA from '../MerchantDashboardCTA';
import FSButtonTypes from '../../../enums/fsbutton.enum';

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
      <MerchantDashboardCTA
        HeaderText={headerText}
        BodyText={bodyText}
        LinkText=""
        LinkPath=""
        ButtonType={FSButtonTypes.Blue}
        ShowCheck={true}
      />
    );

    const renderedHeaderText = queryByText(headerText);
    const renderedBodyText = queryByText(bodyText);
    expect(renderedHeaderText).toBeInTheDocument();
    expect(renderedBodyText).toBeInTheDocument();

    // the tests for the button in this component is covered by FSButton.test.tsx
  });
});
