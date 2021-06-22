import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { cleanup, render, act } from '@testing-library/react';
import { AddUserModal } from 'components/AddUserModal/AddUserModal';
import MaterialUiTheme from 'components/MaterialUiTheme/MaterialUiTheme';
import React from 'react';
import { muiTheme } from 'utils/theme.styles';

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

test('Has tile with correct font', () => {
  const renderedTheme = createMuiTheme(muiTheme);
  const { queryByText, getByLabelText } = render(
    <MaterialUiTheme>
      <AddUserModal
        isOpen={true}
        closeCallback={() => {
          return undefined;
        }}></AddUserModal>
    </MaterialUiTheme>
  );
  const { typography, palette } = renderedTheme;
  const titleNode = queryByText(/Merchant Users/i);
  expect(titleNode).toBeInTheDocument();
  expect(titleNode).toHaveStyle(`font-family: Source Sans Pro,sans-serif;`);
});

test('close function fired value when close button clicked', () => {
  const onClose = jest.fn();
  const { queryByText, getByLabelText, getAllByLabelText } = render(
    <AddUserModal isOpen={true} closeCallback={onClose}></AddUserModal>
  );

  const closeIcon = getByLabelText('Close Button');
  expect(closeIcon).toBeInTheDocument();

  act(() => {
    closeIcon.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('add user button', () => {
  const onClose = jest.fn();
  const { getByLabelText, getAllByLabelText } = render(
    <AddUserModal isOpen={true} closeCallback={onClose}></AddUserModal>
  );

  const addButton = getByLabelText(/Add User/i);
  expect(addButton).toBeInTheDocument();

  act(() => {
    addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  const fullNameInputs = getAllByLabelText(/Full Name/i);
  expect(fullNameInputs.length == 2);
});

test('bad form inputs dont allow submit', () => {
  const onClose = jest.fn();
  const { queryByText, getByLabelText, getAllByLabelText } = render(
    <AddUserModal isOpen={true} closeCallback={onClose}></AddUserModal>
  );

  const doneButton = getByLabelText(/Done/i);
  expect(doneButton).toBeInTheDocument();

  act(() => {
    doneButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  const fullNameInputs = getAllByLabelText(/Full Name/i);
  expect(fullNameInputs.length == 2);

  expect(onClose).toHaveBeenCalledTimes(0);
});
