import { cleanup, render, act } from '@testing-library/react';
import React from 'react';
import DownloadButton from '../DownloadButton';

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
  test('render_DownloadButton_DisplaysDesiredText', () => {
    const displayText = 'Download Display Text';
    const { queryByText } = render(<DownloadButton DisplayText={displayText} LinkPath="" />);

    const renderedText = queryByText(displayText);
    expect(renderedText).toBeInTheDocument();
  });

  test('render_DownloadButton_LinkTargetsDesiredDownloadLocation', () => {
    // this will be implemented once we have the download location implementation finalized
  });
});
