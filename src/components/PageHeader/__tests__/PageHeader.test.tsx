// check that header text and body text is rendered as expected

import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageHeader from 'components/PageHeader/PageHeader';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

jest.mock('react-i18next');

describe('<PageHeader />', () => {
  let history: History<unknown>;

  afterEach(cleanup);

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it('should display correct text', () => {
    const DisplayText = 'header text';
    const LinkPath = '';

    render(
      <Router history={history}>
        <PageHeader DisplayText={DisplayText} LinkPath={LinkPath} />
      </Router>
    );

    const renderedHeaderText = screen.queryByText(DisplayText);
    expect(renderedHeaderText).toBeInTheDocument();

    const button = screen.queryByTestId('page-header-back-link') as HTMLElement;
    expect(button).not.toBeInTheDocument();
  });

  it('should navigate to expected location when back arrow is clicked', () => {
    const DisplayText = 'header text';
    const LinkPath = '/merchant/dashboard';

    render(
      <Router history={history}>
        <PageHeader DisplayText={DisplayText} LinkPath={LinkPath} />
      </Router>
    );

    const button = screen.queryByTestId('page-header-back-link') as HTMLElement;

    userEvent.click(button);

    expect(history.location.pathname).toEqual(LinkPath);
  });
});
