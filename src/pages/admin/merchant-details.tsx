import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AddUserModal } from 'components/AddUserModal/AddUserModal';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: 'left',
  },
  heading: {
    marginTop: '3rem',
    marginBottom: '2rem',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.875rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1,
    letterSpacing: 'normal',
    color: '#000000',
  },
  subheading: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.25,
    letterSpacing: 'normal',
    color: '#000000',
    marginBottom: '1rem',
  },
  sectionContainer: {
    width: '100%',
    height: '21.5rem',
    marginBottom: '2rem',
    borderRadius: '0.5rem',
    backgroundColor: '#fafafa',
  },
}));

const MerchantDetailPage = () => {
  const [isAddUsersOpen, setIsAddUsersOpen] = useState(true);

  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <AddUserModal
        isOpen={isAddUsersOpen}
        closeCallback={() => {
          setIsAddUsersOpen(false);
        }}></AddUserModal>
      {/* TODO: Replace the merchant name with merchant data prop   */}
      <Typography className={classes.heading}>Best Buy</Typography>
      <Typography className={classes.subheading}>{t('Merchant Details')}</Typography>
      <div className={classes.sectionContainer}>[MERCHANT DETAILS PLACEHOLDER]</div>
      <Typography className={classes.subheading}>{t('Merchant Users')}</Typography>
      <div className={classes.sectionContainer}>
        [MERCHANT USERS PLACEHOLDER]
        <Button onClick={() => setIsAddUsersOpen(true)}>Add Users</Button>
      </div>
      <Typography className={classes.subheading}>{t('Merchant Questionnaire')}</Typography>
      <div className={classes.sectionContainer}>[MERCHANT QUESTIONNAIRE PLACEHOLDER]</div>
      <Typography className={classes.subheading}>{t('Merchant Logos')}</Typography>
      <div className={classes.sectionContainer}>[MERCHANT LOGOS PLACEHOLDER]</div>
      <Typography className={classes.subheading}>{t('Merchant Plans')}</Typography>
      <div className={classes.sectionContainer}>[MERCHANT PLANS PLACEHOLDER]</div>
    </Container>
  );
};

export default MerchantDetailPage;
