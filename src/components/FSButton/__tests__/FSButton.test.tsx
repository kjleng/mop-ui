import React from 'react';
import FSButton from '../FSButton';
import { cleanup, render, act, fireEvent } from '@testing-library/react';
import { FSButtonTypes } from '../../../enums/fsbutton.enum';

const linkText = 'Link';
const linkPath = 'http://www.google.ca';

afterEach(cleanup);

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
    const { container } = render(
      <FSButton linkText={linkText} linkPath={linkPath} type={FSButtonTypes.White} />
    );

    console.log(Object.values((container.firstChild! as HTMLElement).classList));

    expect(Object.values((container.firstChild! as HTMLElement).classList)).toMatchObject(
      expect.arrayContaining([expect.stringContaining('ctaWhite')])
    );
  });

  test('render_FSButton_LinkPointsToExpectedLocation', () => {
    global.window = { location: { pathname: "/" } };
    const { container, queryByTestId } = render(
      <FSButton linkText={linkText} linkPath={linkPath} type={FSButtonTypes.Blue} />
    );

    const button = queryByTestId('fsbutton');

    fireEvent.click(button as HTMLElement);

    expect(global.window.location.pathname).toEqual(linkPath);
  });
});
