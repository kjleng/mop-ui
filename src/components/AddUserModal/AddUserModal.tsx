import { makeStyles, Typography, Button, TextField, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { ToggleButton, ToggleButtonGroup, Color as AlertColor } from '@material-ui/lab';

import { MerchantUserDTO, addUserMerchant } from 'api/merchant-user';
import { Modal } from 'components/Modal/Modal';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface AddUserModalProps {
  isOpen: boolean;
  closeCallback: () => void;
}

type FormError = {
  fullName?: string;
  emailAddress?: string;
  language?: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '60rem',
    backgroundColor: theme.palette.background.paper,
    border: '0.2rem solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formHeaderContainer: {
    display: 'grid',
    padding: '0.8rem 2.4rem',
    gridTemplateColumns: '70% 30%',
    '& .formHeaderText': {
      gridColumnStart: '1',
      justifySelf: 'left',
      alignSelf: 'center',
      fontFamily: 'Halvetica',
      fontSize: '1.6rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.5',
      letterSpacing: '-0.015rem',
      color: 'rgba(0, 0, 0, 0.87)',
      whiteSpace: 'nowrap',
      // width: '19rem',
    },
    '& .addUserButton': {
      gridColumnStart: 2,
      justifySelf: 'right',
      alignSelf: 'center',
      fontFamily: 'Source Sans Pro',
      fontSize: '1.8rem',
      fontWeight: 600,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: theme.palette.secondary.main,
      whiteSpace: 'nowrap',
    },
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 'none',
    '& button': {
      // gridColumnStart: 2,
      // justifySelf: 'right',
      // alignSelf: 'center',
      fontFamily: 'Source Sans Pro',
      fontSize: '1.8rem',
      fontWeight: 600,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: theme.palette.secondary.dark,
    },
  },
  newUserInputs: {
    gridColumnStart: '1',
    display: `flex`,
    flexDirection: `column`,
    '& .toggle-label': {
      color: `#333`,
      fontSize: `1.4rem`,
      fontWeight: 600,
      marginBottom: `0.8rem`,
      fontFamily: 'Source Sans Pro',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    '& .button': {
      border: `0.1rem solid #009bcd`,
      padding: `0.9rem 0.4rem`,
      '& p': {
        color: `#009bcd`,
        textTransform: `none`,
        fontSize: `1.6rem`,
        fontWeight: 600,
        marginBottom: '0rem',
      },
    },
    '& .button.Mui-selected': {
      border: `1px solid #009bcd`,
      backgroundColor: `#009bcd`,
      '& p': {
        color: `#fff`,
        textTransform: `none`,
        fontSize: `1.6rem`,
        fontWeight: 600,
      },
    },

    '& .languageLabel': {
      fontSize: `1.6rem`,
      fontWeight: 600,
      marginBottom: `0.8rem`,
      fontFamily: 'Source Sans Pro',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textAlign: 'center',
    },

    [theme.breakpoints.up(`md`)]: {
      display: `grid`,
      gridGap: `2.4rem`,
      gridTemplateAreas: `
                'fullName emailAddress'
                'language language'
                'dialogActions dialogActions'
                `,
    },
    '& .fullName': {
      gridArea: `fullName`,
    },
    '& .emailAddress': {
      gridArea: `emailAddress`,
    },

    '& .language': {
      gridArea: `language`,
    },
    '& .dialogActions': {
      gridArea: `dialogActions`,
    },

    '& label.Mui-focused': {
      color: `#3f2a56`,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: `#3f2a56`,
    },
    '& .MuiInputLabel-root': {
      width: '23.5rem',
      height: '3rem',
      margin: '0.6rem 1.5rem 0.4rem 0',
      fontFamily: 'Source Sans Pro',
      fontSize: '1.4rem',
      fontWeight: 600,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#333333',
      marginBottom: '2.4rem',
    },
    '& .MuiInputLabel-asterisk': {
      display: 'none',
    },
  },
  newUserContainer: {
    display: 'grid',
    padding: '0.8rem 2.4rem',
    margin: '0.5rem auto',
    gridTemplateColumns: '90% 10%',
    borderRadius: '0.5rem',
    backgroundColor: '#fafafa',
    '& .removeUserIcon': {
      gridColumnStart: '2',
      gridRowStart: '1',
      gridRowEnd: '1',
      justifySelf: 'right',
    },
  },
  dialogActionButton: {
    fontFamily: 'Source Sans Pro',
    fontSize: '1.8rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    color: theme.palette.secondary.main,
  },
}));

export const AddUserModal: FC<AddUserModalProps> = (props: AddUserModalProps) => {
  const { isOpen, closeCallback } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const currentLang = () => {
    const currentLang = i18n.language;
    const regex = new RegExp('^en');

    return regex.test(currentLang) ? 'en' : 'fr';
  };

  const [newUsers, setNewUsers] = React.useState<Array<MerchantUserDTO>>([
    { fullName: '', emailAddress: '', language: currentLang() },
  ]);

  const [errors, setErrors] = React.useState<Array<FormError>>([]);

  const resetState = () => {
    setNewUsers([{ fullName: '', emailAddress: '', language: currentLang() }]);
    setErrors([]);
  };

  const handleClose = () => {
    resetState();
    closeCallback();
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      // only submit if form is valid

      let isError = false;

      for (let index = 0; index < newUsers.length; index++) {
        const response = await addUserMerchant(newUsers[index]);
        isError = !response.success;

        setErrors(() => {
          const currentError: FormError = {
            ...errors[index],
            fullName: response?.error?.fullName,
            emailAddress: response?.error?.emailAddress,
            language: response?.error?.language,
          };
          return [...errors, currentError];
        });
      }

      !isError && handleClose(); // if no error, close modal
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={t('Add Merchant User')}
      closeCallback={() => {
        if (typeof closeCallback === 'function') closeCallback();
      }}>
      <form onSubmit={submit}>
        <div className={classes.formHeaderContainer}>
          <Typography className="formHeaderText">{t('Merchant Users')}</Typography>
          <Button
            className="addUserButton"
            aria-label="Add User"
            onClick={() => {
              setNewUsers((prevValue) => {
                return [...prevValue, { fullName: '', emailAddress: '', language: 'fr' }];
              });
            }}>
            <AddIcon></AddIcon>
            {t('Add New User')}
          </Button>
        </div>

        {newUsers.map((user, reactIndex) => {
          return (
            <Container className={classes.newUserContainer} key={reactIndex}>
              <CloseIcon
                className="removeUserIcon"
                onClick={() => {
                  setNewUsers((prevValue) =>
                    prevValue.filter((user, arrindex) => arrindex != reactIndex)
                  );
                }}></CloseIcon>
              <div className={classes.newUserInputs}>
                <TextField
                  className="fullName"
                  aria-label="Full Name"
                  required
                  InputProps={{
                    onChange: ({ target: { value } }) =>
                      setNewUsers((prevValue) =>
                        prevValue.map((user, userIndex) => {
                          if (userIndex == reactIndex) {
                            user.fullName = value;

                            return user;
                          } else {
                            return user;
                          }
                        })
                      ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={t('Full name')}
                  helperText={errors[reactIndex]?.fullName}
                  error={!!errors[reactIndex]?.fullName}
                />
                <TextField
                  className="emailAddress"
                  aria-label="Email Address"
                  required
                  type="email"
                  InputProps={{
                    onChange: ({ target: { value } }) =>
                      setNewUsers((prevValue) =>
                        prevValue.map((user, userIndex) => {
                          if (userIndex == reactIndex) {
                            user.emailAddress = value;

                            return user;
                          } else {
                            return user;
                          }
                        })
                      ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={t('Email address')}
                  helperText={errors[reactIndex]?.emailAddress}
                  error={!!errors[reactIndex]?.emailAddress}
                />
                <div className="language">
                  <Typography className="toggle-label">{t('Language')}</Typography>
                  <ToggleButtonGroup
                    exclusive
                    value={newUsers[reactIndex].language}
                    onChange={(event, value) => {
                      setNewUsers((prevState) => {
                        return newUsers.map((user, userIndex) => {
                          if (userIndex == reactIndex) {
                            user.language = value == 'fr' ? 'fr' : 'en';
                            return user;
                          } else {
                            return user;
                          }
                        });
                      });
                    }}>
                    <ToggleButton className="button" value={'en'}>
                      <Typography className="languageLabel">{t('English')}</Typography>
                    </ToggleButton>
                    <ToggleButton className="button" value={'fr'}>
                      <Typography className="languageLabel">{t('French')}</Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </Container>
          );
        })}

        <div className={classes.actionBar}>
          <Button
            aria-label="Close Button"
            onClick={handleClose}
            className={classes.dialogActionButton}>
            {t('Cancel')}
          </Button>
          <Button aria-label="Done" type="submit" className={classes.dialogActionButton}>
            {t('Done')}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
