import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FSButton from 'components/FSButton/FSButton';
import { FSButtonTypes } from 'enums/fsbutton.enum';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

jest.mock('react-i18next');

const linkText = 'Link';
const linkPath = '/merchant/dashboard';

function renderFSButton(buttonType: FSButtonTypes) {
  return render(<FSButton linkText={linkText} linkPath={linkPath} type={buttonType} />);
}

describe('<FSButton />', () => {
  let history: History<unknown>;

  afterEach(cleanup);

  beforeEach(() => {
    history = createMemoryHistory();
  });

  test('should display correct text', () => {
    renderFSButton(FSButtonTypes.Blue);

    const renderedText = screen.queryByText(linkText);
    expect(renderedText).toBeInTheDocument();
  });

  test('should render blue type with blue style', () => {
    const { container } = renderFSButton(FSButtonTypes.Blue);

    expect(Object.values((container.firstChild! as HTMLElement).classList)).toMatchObject(
      expect.arrayContaining([expect.stringContaining('ctaBlue')])
    );
  });

  test('should render white type with white style', () => {
    const { container } = renderFSButton(FSButtonTypes.White);

    expect(Object.values((container.firstChild! as HTMLElement).classList)).toMatchObject(
      expect.arrayContaining([expect.stringContaining('ctaWhite')])
    );
  });

  test('should link to expected target location', () => {
    render(
      <Router history={history}>
        <FSButton linkText={linkText} linkPath={linkPath} type={FSButtonTypes.Blue} />
      </Router>
    );

    const button = screen.queryByTestId('fsbutton') as HTMLElement;

    userEvent.click(button);

    expect(history.location.pathname.toString() + history.location.search.toString()).toEqual(
      linkPath
    );
  });
});
