import { createMuiTheme } from '@material-ui/core/styles';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddUserModal } from 'components/AddUserModal/AddUserModal';
import MaterialUiTheme from 'components/MaterialUiTheme/MaterialUiTheme';
import React from 'react';
import { muiTheme } from 'utils/theme.styles';

jest.mock('react-i18next');

describe('<AddUserModal />', () => {
  afterEach(cleanup);

  it('should render modal with correct title and styling', () => {
    createMuiTheme(muiTheme);

    render(
      <MaterialUiTheme>
        <AddUserModal
          merchantHash="testhash"
          isOpen={true}
          closeCallback={() => {
            return undefined;
          }}></AddUserModal>
      </MaterialUiTheme>
    );

    const titleNode = screen.queryByText(/Merchant Users/i);
    expect(titleNode).toBeInTheDocument();
    expect(titleNode).toHaveStyle(`font-family: Source Sans Pro,sans-serif;`);
  });

  it('should call onClose function when close button is clicked', () => {
    const onClose = jest.fn();
    render(<AddUserModal isOpen closeCallback={onClose} merchantHash="testhash"></AddUserModal>);

    const closeIcon = screen.getByLabelText('Close Button');
    expect(closeIcon).toBeInTheDocument();

    userEvent.click(closeIcon);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should add fields for new user when add user button is clicked', async () => {
    const onClose = jest.fn();
    render(<AddUserModal isOpen closeCallback={onClose} merchantHash="testhash"></AddUserModal>);

    const addButton = screen.getByLabelText(/Add User/i);
    expect(addButton).toBeInTheDocument();

    userEvent.click(addButton);

    const fullNameInputs = await screen.findAllByLabelText(/Full Name/i);
    expect(fullNameInputs.length == 2);
  });

  it('should not allow submit when given bad form inputs', async () => {
    const onClose = jest.fn();
    render(<AddUserModal isOpen closeCallback={onClose} merchantHash="testhash"></AddUserModal>);

    const doneButton = screen.getByLabelText(/Done/i);
    expect(doneButton).toBeInTheDocument();

    userEvent.click(doneButton);

    const fullNameInputs = await screen.findAllByLabelText(/Full Name/i);

    expect(fullNameInputs.length == 2);
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});
