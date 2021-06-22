import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { cleanup, render, act } from '@testing-library/react';
import MaterialUiTheme from 'components/MaterialUiTheme/MaterialUiTheme';
import { Modal } from 'components/Modal/Modal';
import React from 'react';
import { muiTheme } from 'utils/theme.styles';

afterEach(cleanup);

test('Has tile with correct font', () => {
  const renderedTheme = createMuiTheme(muiTheme);
  const { queryByText, getByLabelText } = render(
    <MaterialUiTheme>
      <Modal isOpen={true} title={'OurTitle'}></Modal>
    </MaterialUiTheme>
  );
  const { typography, palette } = renderedTheme;
  const titleNode = queryByText(/OurTitle/i);
  expect(titleNode).toBeInTheDocument();
  expect(titleNode).toHaveStyle(`font-family: Source Sans Pro,sans-serif;`);
});

test('close function fired value when x clicked', () => {
  const onClose = jest.fn();
  const { queryByText, getByLabelText } = render(
    <Modal isOpen={true} title={'OurTitle'} closeCallback={onClose}></Modal>
  );

  const closeIcon = getByLabelText('Close');
  expect(closeIcon).toBeInTheDocument();

  act(() => {
    closeIcon.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('toaster works', () => {
  const onClose = jest.fn();
  const { queryByText, getByLabelText } = render(
    <Modal
      isOpen={true}
      isToasterOpen={true}
      toasterMessage={'toaster_message'}
      toasterColor={'error'}></Modal>
  );

  const toaster = queryByText('toaster_message');
  expect(toaster).toBeInTheDocument();
  expect(toaster).toHaveStyle(`backgroundColor: '#00a857'`);
});
