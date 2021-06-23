import {
  makeStyles,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ToggleButton, ToggleButtonGroup, Alert, Color as AlertColor } from '@material-ui/lab';

import { searchMerchant, addMerchant } from 'api/merchant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

interface AddMerchantModalProps {
  isOpen: boolean;
  closeCallback: () => void;
}

type MerchantFoundForm = {
  merchantName: string;
  displayName: string;
  merchantId: string;
  ecomId: string;
  additionalDetailsExpanded: boolean;
  orderManagement: boolean;
  paymentGateway: boolean;
  showPlan: boolean;
  performPayment: boolean;
  authorizationFormat: 'Short' | 'Extended';
};

type SearchMerchantForm = {
  name: string;
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
  merchantFoundForm: {
    display: `flex`,
    flexDirection: `column`,
    [theme.breakpoints.up(`md`)]: {
      display: `grid`,
      gridGap: `2.4rem`,
      gridTemplateAreas: `
                'merchantName nothing'
                'displayName nothing'
                'merchantId ecomId'
                'drawer drawer'
                'dialogActions dialogActions'
            `,
    },
    '& .merchantName': {
      gridArea: `merchantName`,
    },
    '& .displayName': {
      gridArea: `displayName`,
    },
    '& .merchantId': {
      gridArea: `merchantId`,
    },
    '& .ecomId': {
      gridArea: `ecomId`,
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
    '& .MuiTypography-body1': {
      lineHeight: 'normal',
    },
  },
  merchantFoundInput: {
    fontSize: `2.4rem`,
    lineHeight: `3rem`,
    color: `#333`,
  },
  merchantFoundLabel: {
    color: `#333`,
    fontSize: `1.4rem`,
    lineHeight: `normal`,
    fontWeight: 600,
  },
  merchantFoundDrawer: {
    display: `block`,
    gridArea: `drawer`,
    border: `none`,
    '&::before': {
      display: `none`,
    },
    '& .header': {
      fontSize: `1.6rem`,
      lineHeight: `2rem`,
      fontWeight: 600,
      color: `#333`,
    },
  },
  merchantFoundDrawerSummary: {
    flexDirection: `row-reverse`,
    paddingLeft: 0,
    '& .MuiAccordionSummary-expandIcon': {
      padding: `0`,
      marginRight: `1.2rem`,
      color: `#333`,
    },
  },
  merchantFoundDrawerDetails: {
    display: `block`,
    padding: `0.8rem 0rem`,
    '& .top-toggles': {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `flex-start`,
      [theme.breakpoints.up(`sm`)]: {
        flexDirection: `row`,
      },
    },
    '& .bottom-toggles': {
      marginTop: `0.8rem`,
      display: `flex`,
      flexDirection: `row`,
      flexWrap: `wrap`,
      backgroundColor: `#fafafa`,
      padding: `1.8rem`,
    },
    '& .toggle': {
      fontSize: `1.6rem`,
      marginRight: `1.4rem`,
      marginTop: `0.8rem`,
      [theme.breakpoints.up(`sm`)]: {
        marginTop: `0px`,
      },

      '& .button': {
        border: `0.1rem solid #009bcd`,
        '& p': {
          color: `#009bcd`,
          textTransform: `none`,
          fontSize: `1.6rem`,
          fontWeight: 600,
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
    },
    '& .toggle-label': {
      color: `#333`,
      fontSize: `1.4rem`,
      fontWeight: 600,
      marginBottom: `0.8rem`,
    },
  },
  authorizationSelect: {
    display: `block`,
    width: `100%`,
    marginTop: `2.2rem`,
    '& .label': {
      color: `#333`,
      fontSize: `1.4rem`,
      fontWeight: 600,
      marginBottom: `0.8rem`,
    },
    '& .select': {
      fontSize: `2.4rem`,
      color: `#333`,
      minWidth: `23.6rem`,
      fontFamily: 'Source Sans Pro',
    },
  },
  MuiMenuItem: {
    lineHeight: 'normal',
  },
  formTitle: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.6rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: 'rgba(0, 0, 0, 0.87)',
    marginBottom: '2.4rem',
  },
  inputLabel: {
    margin: ' 0 9.4rem 0.04rem 0',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#333333',
    width: '15.6rem',
    height: '1.4rem',
  },
  labelAsterisk: {
    // color: '#db3131',
    // '&$error': {
    //     color: '#db3131'
    // },
    display: 'none',
  },
  input: {
    width: '23.5rem',
    height: '3rem',
    margin: '0.6rem 1.5rem 0.4rem 0',
    fontFamily: 'Source Sans Pro',
    fontSize: '2.4rem',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    letterSpacing: 'normal',
    color: '#333333',
    marginBottom: '2.4rem',
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
    color: '#007ea8',
  },
  snackBar: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#333333',
  },
  toasterCard: {
    backgroundColor: '#00a857',
    // padding: '1.5rem',
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

export const AddMerchantModal: React.FC<AddMerchantModalProps> = ({ isOpen, closeCallback }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [merchantFound, setMerchantFound] = React.useState(false); //whether merchant search is successful
  const [merchantedAdded, setMerchantedAdded] = React.useState(false); //whether to redirect to details page

  const [toasterOpen, setToasterOpen] = React.useState(false); //whether toaster messgage is open
  const [toasterMessage, setToasterMessage] = React.useState('');
  const [toasterColor, setToasterColor] = React.useState<AlertColor>('success'); // green or red toaster

  const [merchantNameForm, setMerchantNameForm] = React.useState<SearchMerchantForm>({
    name: ``,
  });

  const [merchantFoundForm, setMerchantFoundForm] = React.useState<MerchantFoundForm>({
    displayName: ``,
    merchantId: ``,
    ecomId: ``,
    additionalDetailsExpanded: false,
    orderManagement: true,
    paymentGateway: true,
    showPlan: true,
    performPayment: true,
    authorizationFormat: 'Short',
    merchantName: ``,
  });

  const resetState = () => {
    setMerchantFound(false);
    setToasterOpen(false);
    setToasterMessage('');
    setToasterColor('success');
    setMerchantNameForm({
      name: ``,
    });
    setMerchantFoundForm({
      displayName: ``,
      merchantId: ``,
      ecomId: ``,
      additionalDetailsExpanded: false,
      orderManagement: true,
      paymentGateway: true,
      showPlan: true,
      performPayment: true,
      authorizationFormat: 'Short',
      merchantName: ``,
    });
  };

  const handleClose = () => {
    resetState();
    closeCallback();
  };

  const submitSearchMerchant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      // only submit if form is valid
      if (!merchantFound) {
        // searching for merchant
        try {
          const merchantResponse = await searchMerchant(merchantNameForm.name);

          if (merchantResponse.success) {
            setToasterMessage(t('Merchant successfully found'));
            setToasterOpen(true);
            setMerchantFound(true);
            setToasterColor('success');
            setMerchantFoundForm({ ...merchantFoundForm, merchantName: merchantNameForm.name });
          }
        } catch (error) {
          const msg = error?.data?.message === 'Not found' ? t('Merchant not found') : t('Error');
          setToasterMessage(msg);
          setToasterOpen(true);
          setMerchantFound(false);
          setToasterColor('error');
        }
      } else {
        // adding mercant
        try {
          const merchantResponse = await addMerchant(merchantFoundForm);
          console.log(merchantFoundForm);

          if (merchantResponse.success) {
            setToasterMessage(t('Merchant successfully added'));
            setToasterOpen(true);
            setMerchantFound(true);
            setToasterColor('success');
            setMerchantedAdded(true);
          }
        } catch (error) {
          setToasterMessage(t('Unable to register merchant'));
          setToasterOpen(true);
          setMerchantFound(false);
          setToasterColor('error');
        }
      }
    }
  };

  const toggleButtonReducer = (newSelection: boolean, stateKey: keyof MerchantFoundForm) => {
    const currentState = merchantFoundForm[stateKey];
    if (currentState === newSelection || newSelection === null) return;
    // True or False must be selected, don't let them deselect one and have neither
    else
      return setMerchantFoundForm((prevForm) => ({
        ...prevForm,
        [stateKey]: newSelection,
      }));
  };

  if (merchantedAdded) {
    //redirect to details onces merchant is added
    return <Redirect to={`/admin/merchant-details/${merchantFoundForm.merchantName}`} />;
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} aria-labelledby="add-merchant-modal-title">
        <DialogTitle className={classes.diaglogTitle}>
          <div className={classes.diaglogTitleContainer}>
            <Typography id="add-merchant-modal-title" className={classes.dialogTitleText}>
              {t('Add New Merchant')}
            </Typography>
            <CloseIcon className={classes.dialogTitleClose} onClick={handleClose} />
          </div>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.formTitle}>{t('Add Merchant Details')}</Typography>

          {toasterOpen && (
            <Alert
              classes={{
                root: classes.toasterCard,
                standardError: classes.toasterCardError,
              }}
              icon={false}
              color={toasterColor}
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
              <Typography className={classes.toasterContent}>{toasterMessage}</Typography>
            </Alert>
          )}
          {!merchantFound && (
            <form onSubmit={submitSearchMerchant}>
              <TextField
                name="search-merchant-name"
                label="Search Merchant Name"
                value={merchantNameForm.name}
                InputLabelProps={{
                  classes: { root: classes.inputLabel, asterisk: classes.labelAsterisk },
                  shrink: true,
                }}
                InputProps={{
                  classes: { root: classes.input },
                  onChange: ({ target: { value } }) =>
                    setMerchantNameForm((prevForm) => ({
                      ...prevForm,
                      name: value,
                    })),
                }}
                required={true}
              />

              <DialogActions>
                <Button onClick={handleClose} className={classes.dialogActionButton}>
                  {t('Cancel')}
                </Button>
                <Button type="submit" className={classes.dialogActionButton}>
                  {t('Search')}
                </Button>
              </DialogActions>
            </form>
          )}

          {
            // Search merchant form
            merchantFound && (
              <form className={classes.merchantFoundForm} onSubmit={submitSearchMerchant}>
                <TextField
                  className="merchantName"
                  id="merchantName"
                  InputProps={{
                    classes: { root: classes.input },
                    disableUnderline: true,
                    readOnly: true,
                    onChange: ({ target: { value } }) =>
                      setMerchantFoundForm((prevForm) => ({
                        ...prevForm,
                        merchantName: value,
                      })),
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabel, asterisk: classes.labelAsterisk },
                    shrink: true,
                  }}
                  label={t('Merchant')}
                  defaultValue={merchantNameForm.name}
                />
                <TextField
                  className="displayName"
                  id="displayName"
                  InputProps={{
                    classes: { root: classes.input },
                    value: merchantFoundForm.displayName,
                    onChange: ({ target: { value } }) =>
                      setMerchantFoundForm((prevForm) => ({
                        ...prevForm,
                        displayName: value,
                      })),
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabel, asterisk: classes.labelAsterisk },
                    shrink: true,
                  }}
                  label={t('Display Name')}
                  required={true}
                />
                <TextField
                  className="merchantId"
                  id="merchantId"
                  InputProps={{
                    classes: { root: classes.input },
                    value: merchantFoundForm.merchantId,
                    onChange: ({ target: { value } }) =>
                      setMerchantFoundForm((prevForm) => ({
                        ...prevForm,
                        merchantId: value,
                      })),
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabel, asterisk: classes.labelAsterisk },
                    shrink: true,
                  }}
                  label={t('Merchant Id')}
                  required={true}
                />
                <TextField
                  className="ecomId"
                  id="ecomId"
                  InputProps={{
                    classes: { root: classes.input },
                    value: merchantFoundForm.ecomId,
                    onChange: ({ target: { value } }) =>
                      setMerchantFoundForm((prevForm) => ({
                        ...prevForm,
                        ecomId: value,
                      })),
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabel, asterisk: classes.labelAsterisk },
                    shrink: true,
                  }}
                  label={t('EComm Store ID')}
                  required={true}
                />

                <Accordion
                  className={classes.merchantFoundDrawer}
                  elevation={0}
                  expanded={merchantFoundForm.additionalDetailsExpanded}
                  onChange={() =>
                    setMerchantFoundForm((prevForm) => ({
                      ...prevForm,
                      additionalDetailsExpanded: !prevForm.additionalDetailsExpanded,
                    }))
                  }>
                  <AccordionSummary
                    className={classes.merchantFoundDrawerSummary}
                    expandIcon={<ExpandMoreIcon style={{ padding: 0 }} fontSize="large" />}>
                    <Typography className="header">{t('Additional Details')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.merchantFoundDrawerDetails}>
                    <div className="top-toggles">
                      <div className="toggle">
                        <Typography className="toggle-label">{t('Order Management')}</Typography>
                        <ToggleButtonGroup
                          exclusive
                          value={merchantFoundForm.orderManagement}
                          onChange={(_, newManagement) =>
                            toggleButtonReducer(newManagement, `orderManagement`)
                          }>
                          <ToggleButton className="button" value={true}>
                            <Typography>{t('True')}</Typography>
                          </ToggleButton>
                          <ToggleButton className="button" value={false}>
                            <Typography>{t('False')}</Typography>
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                      <div className="toggle">
                        <Typography className="toggle-label">
                          {t('Payment Gateway Enabled')}
                        </Typography>
                        <ToggleButtonGroup
                          exclusive
                          value={merchantFoundForm.paymentGateway}
                          onChange={(_, newPayment) =>
                            toggleButtonReducer(newPayment, `paymentGateway`)
                          }>
                          <ToggleButton className="button" value={true}>
                            <Typography>{t('True')}</Typography>
                          </ToggleButton>
                          <ToggleButton className="button" value={false}>
                            <Typography>{t('False')}</Typography>
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    </div>
                    {merchantFoundForm.paymentGateway && (
                      <div className="bottom-toggles">
                        <div className="toggle">
                          <Typography className="toggle-label">
                            {t('Show Plan Selection')}
                          </Typography>
                          <ToggleButtonGroup
                            exclusive
                            value={merchantFoundForm.showPlan}
                            onChange={(_, newManagement) =>
                              toggleButtonReducer(newManagement, `showPlan`)
                            }>
                            <ToggleButton className="button" value={true}>
                              <Typography>{t('True')}</Typography>
                            </ToggleButton>
                            <ToggleButton className="button" value={false}>
                              <Typography>{t('False')}</Typography>
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                        <div className="toggle">
                          <Typography className="toggle-label">
                            {t('Perform Payment Authorization')}
                          </Typography>
                          <ToggleButtonGroup
                            exclusive
                            value={merchantFoundForm.performPayment}
                            onChange={(_, newPayment) =>
                              toggleButtonReducer(newPayment, `performPayment`)
                            }>
                            <ToggleButton className="button" value={true}>
                              <Typography>{t('True')}</Typography>
                            </ToggleButton>
                            <ToggleButton className="button" value={false}>
                              <Typography>{t('False')}</Typography>
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </div>
                        <FormControl className={classes.authorizationSelect}>
                          <Typography className="label">{t('Authorization Format')}</Typography>
                          <Select
                            className="select"
                            // IconComponent={() => <ChevronRight className="chevron" fontSize="large" />}
                            id="authorizationFormat"
                            onChange={({ target: { value } }) =>
                              setMerchantFoundForm((prevForm) => ({
                                ...prevForm,
                                authorizationFormat: value as 'Short' | 'Extended',
                              }))
                            }
                            value={merchantFoundForm.authorizationFormat}>
                            <MenuItem className={classes.MuiMenuItem} value="Short">
                              {t('Short')}
                            </MenuItem>
                            <MenuItem className={classes.MuiMenuItem} value="Extended">
                              {t('Extended')}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    )}
                  </AccordionDetails>
                </Accordion>
                <DialogActions className="dialogActions">
                  <Button onClick={handleClose} className={classes.dialogActionButton}>
                    {t('Cancel')}
                  </Button>
                  <Button type="submit" className={classes.dialogActionButton}>
                    {t('Add Merchant')}
                  </Button>
                </DialogActions>
              </form>
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};
