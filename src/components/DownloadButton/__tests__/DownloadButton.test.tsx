import { cleanup, render, screen } from '@testing-library/react';
import DownloadButton from 'components/DownloadButton/DownloadButton';
import React from 'react';

describe('<DownloadButton />', () => {
  afterEach(cleanup);

  it('should display desired text', () => {
    const displayText = 'Download Display Text';
    render(<DownloadButton DisplayText={displayText} LinkPath="" />);

    const renderedText = screen.queryByText(displayText);
    expect(renderedText).toBeInTheDocument();
  });

  it('should have a link with the correct target location', () => {
    // this will be implemented once we have the download location implementation finalized
  });
});
