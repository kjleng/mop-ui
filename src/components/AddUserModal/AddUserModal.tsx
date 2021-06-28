import { makeStyles, Typography, Button, TextField, Container } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { ToggleButton, ToggleButtonGroup, Color as AlertColor } from '@material-ui/lab';
import { MerchantUserDTO, addUserMerchant } from 'api/merchant-user';
import { Modal } from 'components/Modal/Modal';
import React, { FC } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { validEmail } from 'utils/validators.utils';

interface AddUserModalProps {
  isOpen: boolean;
  closeCallback: () => void;
  merchantHash: string;
}

type FormError = {
  fullName?: string;
  emailAddress?: string;
  language?: string;
};

interface MerchantUserState extends MerchantUserDTO {
  nameError: boolean;
  emailError: boolean;
}

type FormValues = {
  users: Array<{
    fullName: string;
    emailAddress: string;
    language: string;
  }>;
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
      marginBottom: '2.4rem',
    },
    '& label': {
      color: '#333333',
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
  const { isOpen, closeCallback, merchantHash } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const {
    control,
    reset,
    handleSubmit,
    formState,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      users: [{ fullName: '', emailAddress: '', language: 'en' }],
    },
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({ name: 'users', control });

  const currentLang = () => {
    const currentLang = i18n.language;
    const regex = new RegExp('^en');

    return regex.test(currentLang) ? 'en' : 'fr';
  };

  const [newUsersLangs, setNewUsersLangs] = React.useState<Array<string>>([currentLang()]);

  const [isToasterOpen, setIsToasterOpen] = React.useState<boolean>(false);
  const [toasterMsg, setToasterMsg] = React.useState<string>('');

  const handleClose = () => {
    setIsToasterOpen(false);
    setToasterMsg('');
    setNewUsersLangs(['en']);
    reset({
      users: [{ fullName: '', emailAddress: '', language: 'en' }],
    });
    closeCallback();
  };

  const onSubmit = async (validatedInputs: FormValues) => {
    console.log(validatedInputs);

    const users = validatedInputs.users.map((value, index) => {
      return {
        ...value,
        language: newUsersLangs[index] == 'fr' ? 'fr' : 'en',
      };
    });

    const response = await addUserMerchant(users, merchantHash);

    if (!response.success) {
      setIsToasterOpen(true);
      setToasterMsg(t('Error'));
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={t('Add Merchant User')}
      toasterMessage={toasterMsg}
      isToasterOpen={isToasterOpen}
      toasterColor="error"
      closeCallback={() => {
        if (typeof closeCallback === 'function') closeCallback();
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formHeaderContainer}>
          <Typography className="formHeaderText">{t('Merchant Users')}</Typography>
          <Button
            className="addUserButton"
            aria-label="Add User"
            onClick={() => {
              setNewUsersLangs([...newUsersLangs, currentLang()]);
              append({
                fullName: '',
                emailAddress: '',
                language: 'fr',
              });
            }}>
            <AddIcon></AddIcon>
            {t('Add New User')}
          </Button>
        </div>

        {fields.map((user, reactIndex) => {
          return (
            <Container className={classes.newUserContainer} key={user.id}>
              <CloseIcon
                className="removeUserIcon"
                onClick={() => {
                  remove(reactIndex);
                }}></CloseIcon>
              <div className={classes.newUserInputs}>
                <TextField
                  className="fullName"
                  aria-label="Full Name"
                  aria-required="true"
                  InputProps={{
                    ...register(`users.${reactIndex}.fullName` as const, {
                      required: true,
                    }),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={t('Full name')}
                  helperText={errors?.users?.[reactIndex]?.fullName && t('Field is required')}
                  error={!!errors?.users?.[reactIndex]?.fullName}
                />
                <TextField
                  className="emailAddress"
                  aria-label="Email Address"
                  aria-required="true"
                  InputProps={{
                    ...register(`users.${reactIndex}.emailAddress` as const, {
                      required: true,
                      pattern: validEmail,
                    }),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={t('Email address')}
                  helperText={
                    errors?.users?.[reactIndex]?.emailAddress && t('Please provide valid email')
                  }
                  error={!!errors?.users?.[reactIndex]?.emailAddress}
                />

                <div className="language">
                  <Typography className="toggle-label">{t('Language')}</Typography>
                  <ToggleButtonGroup
                    exclusive
                    value={newUsersLangs[reactIndex]}
                    onChange={(event, value) => {
                      setNewUsersLangs((prevState) => {
                        return newUsersLangs.map((user, userIndex) => {
                          if (userIndex == reactIndex) {
                            user = value == 'fr' ? 'fr' : 'en';
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
