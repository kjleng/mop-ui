import { cleanup, render } from '@testing-library/react';
import MerchantDashboardCTA from 'components/MerchantDashboardCTA/MerchantDashboardCTA';
import FSButtonTypes from 'enums/fsbutton.enum';
import React from 'react';

jest.mock('react-i18next');

describe('<MerchantDashboardCTA />', () => {
  afterEach(cleanup);

  it('should display correct text', () => {
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
  });
});
