import {
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Alert, Color as AlertColor } from '@material-ui/lab';

import React from 'react';

const useStyles = makeStyles((theme) => ({
  action: {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
  paper: {
    position: 'absolute',
    width: '60rem',
    backgroundColor: theme.palette.background.paper,
    border: '0.2rem solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  diaglogTitle: {
    padding: '1.6rem 2.4rem 1.5rem',
  },
  diaglogTitleContainer: {
    display: 'grid',
    gridTemplateColumns: '95% 5%',
  },
  dialogTitleText: {
    gridColumnStart: '1',
    justifySelf: 'left',
    alignSelf: 'center',
    margin: '0.1rem 33.8rem 0 0',
    fontFamily: 'Source Sans Pro',
    fontSize: '2.4rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.08',
    letterSpacing: '-0.05rem',
    color: '#3f2a56',
    whiteSpace: 'nowrap',
    width: '19rem',
  },
  dialogTitleClose: {
    gridColumnStart: 2,
    justifySelf: 'right',
    alignSelf: 'center',
  },
  toasterCard: {
    backgroundColor: '#00a857',
    borderRadius: '0.4rem',
  },
  toasterCardError: {
    backgroundColor: '#c42323',
  },
  toasterContent: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.6rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    letterSpacing: 'normal',
    lineHeight: 1.25,
    color: ' #ffffff',
  },
}));

interface ModalProps {
  closeCallback?: () => void;
  disableClickaway?: boolean;
  isOpen: boolean;
  isToasterOpen?: boolean;
  showPrimaryAction?: boolean;
  showCancel?: boolean;
  title?: string;
  toasterColor?: AlertColor;
  toasterMessage?: string;
}

export const Modal: React.FC<ModalProps> = ({
  closeCallback,
  disableClickaway = false,
  isOpen,
  isToasterOpen = false,
  showPrimaryAction = false,
  showCancel = false,
  title = '',
  toasterColor = 'success',
  toasterMessage,
  children,
}) => {
  const classes = useStyles();

  const [toasterOpen, setToasterOpen] = React.useState(isToasterOpen); //whether toaster messgage is open
  const [toastMessage, setToastMessage] = React.useState(toasterMessage);
  const [toastColor, setToastColor] = React.useState(toasterColor);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (disableClickaway && reason === 'backdropClick') return;
    isOpen = false;
    if (typeof closeCallback === 'function') closeCallback();
  };

  React.useEffect(() => {
    setToasterOpen(isToasterOpen);
  }, [isToasterOpen]);

  React.useEffect(() => {
    setToastColor(toasterColor);
  }, [toasterColor]);

  React.useEffect(() => {
    setToastMessage(toasterMessage);
  }, [toasterMessage]);

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="add-merchant-modal-title">
        <DialogTitle className={classes.diaglogTitle}>
          <div className={classes.diaglogTitleContainer}>
            <Typography id="add-merchant-modal-title" className={classes.dialogTitleText}>
              {title}
            </Typography>
            <CloseIcon
              aria-label="Close"
              className={classes.dialogTitleClose}
              onClick={handleClose}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          {toasterOpen && (
            <Alert
              classes={{
                root: classes.toasterCard,
                standardError: classes.toasterCardError,
              }}
              icon={false}
              color={toastColor}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setToasterOpen(false);
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }>
              <Typography className={classes.toasterContent}>{toastMessage}</Typography>
            </Alert>
          )}
          {children}
        </DialogContent>
        <DialogActions>
          {showCancel && (
            <Button onClick={handleClose} color="primary" className={classes.action}>
              Cancel
            </Button>
          )}
          {showPrimaryAction && (
            <Button onClick={handleClose} color="primary" className={classes.action}>
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
