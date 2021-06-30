import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MaterialUiTheme from 'components/MaterialUiTheme/MaterialUiTheme';
import { Modal } from 'components/Modal/Modal';
import React from 'react';
import { muiTheme } from 'utils/theme.styles';

describe('<Modal />', () => {
  afterEach(cleanup);

  it('should render modal with correct title and styling', () => {
    createMuiTheme(muiTheme);

    render(
      <MaterialUiTheme>
        <Modal isOpen title="OurTitle" />
      </MaterialUiTheme>
    );

    const titleNode = screen.queryByText(/OurTitle/i);
    expect(titleNode).toBeInTheDocument();
    expect(titleNode).toHaveStyle(`font-family: Source Sans Pro,sans-serif;`);
  });

  it('should call onClose function when close icon is clicked', () => {
    const onClose = jest.fn();
    render(<Modal isOpen title="OurTitle" closeCallback={onClose} />);

    const closeIcon = screen.getByLabelText('Close');
    expect(closeIcon).toBeInTheDocument();

    userEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should display toaster with correct text and colour', () => {
    render(
      <Modal isOpen isToasterOpen toasterMessage={'toaster_message'} toasterColor={'error'} />
    );

    const toaster = screen.queryByText('toaster_message');
    expect(toaster).toBeInTheDocument();
    expect(toaster).toHaveStyle(`backgroundColor: '#00a857'`);
  });
});
