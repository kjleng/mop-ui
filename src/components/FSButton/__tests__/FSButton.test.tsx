import { cleanup, render, fireEvent } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { FSButtonTypes } from '../../../enums/fsbutton.enum';
import FSButton from '../FSButton';

const linkText = 'Link';
const linkPath = '/merchant/dashboard';

function renderFSButton(buttonType: FSButtonTypes) {
  return render(<FSButton linkText={linkText} linkPath={linkPath} type={buttonType} />);
}

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

  test('render_FSButton_DisplaysDesiredText', () => {
    const { queryByText } = renderFSButton(FSButtonTypes.Blue);

    const renderedText = queryByText(linkText);
    expect(renderedText).toBeInTheDocument();
  });

  test('render_FSButton_BlueTypeRenderedWithBlueStyle', () => {
    const { container } = renderFSButton(FSButtonTypes.Blue);

    expect(Object.values((container.firstChild! as HTMLElement).classList)).toMatchObject(
      expect.arrayContaining([expect.stringContaining('ctaBlue')])
    );
  });

  test('render_FSButton_WhiteTypeRenderedWithWhiteStyle', () => {
    const { container } = renderFSButton(FSButtonTypes.White);

    expect(Object.values((container.firstChild! as HTMLElement).classList)).toMatchObject(
      expect.arrayContaining([expect.stringContaining('ctaWhite')])
    );
  });

  test('render_FSButton_LinkPointsToExpectedLocation', () => {
    const { container, queryByTestId } = render(
      <Router history={history}>
        <FSButton linkText={linkText} linkPath={linkPath} type={FSButtonTypes.Blue} />
      </Router>
    );

    const button = queryByTestId('fsbutton') as HTMLElement;

    fireEvent.click(button);

    expect(history.location.pathname.toString() + history.location.search.toString()).toEqual(
      linkPath
    );
  });
});
