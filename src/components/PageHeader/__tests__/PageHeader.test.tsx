// check that header text and body text is rendered as expected

import React from 'react';
import PageHeader from '../PageHeader';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import { Router } from 'react-router-dom';

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
  let history: History<unknown>;

  afterEach(cleanup);

  beforeEach(() => {
    history = createMemoryHistory();
  });

  test('render_PageHeader_DisplaysDesiredText', () => {
    const DisplayText = 'header text';
    const LinkPath = '';
    const { container, queryByText, queryByTestId } = render(
      <Router history={history}>
        <PageHeader DisplayText={DisplayText} LinkPath={LinkPath} />
      </Router>
    );

    const renderedHeaderText = queryByText(DisplayText);
    expect(renderedHeaderText).toBeInTheDocument();

    const button = queryByTestId('page-header-back-link') as HTMLElement;
    expect(container.contains(button)).toBe(false);
  });

  test('render_PageHeader_BackArrowNavigatesToAppriateLocation', () => {
    const DisplayText = 'header text';
    const LinkPath = '/merchant/dashboard';
    const { queryByTestId } = render(
      <Router history={history}>
        <PageHeader DisplayText={DisplayText} LinkPath={LinkPath} />
      </Router>
    );

    const button = queryByTestId('page-header-back-link') as HTMLElement;

    fireEvent.click(button);

    expect(history.location.pathname.toString() + history.location.search.toString()).toEqual(
      LinkPath
    );
  });
});
