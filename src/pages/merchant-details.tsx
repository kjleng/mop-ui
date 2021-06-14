import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
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
    height: '215px',
    marginBottom: '2rem',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
  },
}));

const MerchantDetailPage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      {/* TODO: Replace the merchant name with merchant data prop   */}
      <Typography className={classes.heading}>Best Buy</Typography>
      <Typography className={classes.subheading}>Merchant Details</Typography>
      <div className={classes.sectionContainer}>[MERCHANT DETAILS PLACEHOLDER]</div>
      <Typography className={classes.subheading}>Merchant Users</Typography>
      <div className={classes.sectionContainer}>[MERCHANT USERS PLACEHOLDER]</div>
      <Typography className={classes.subheading}>Merchant Questionnaire</Typography>
      <div className={classes.sectionContainer}>[MERCHANT QUESTIONNAIRE PLACEHOLDER]</div>
      <Typography className={classes.subheading}>Merchant Logos</Typography>
      <div className={classes.sectionContainer}>[MERCHANT LOGOS PLACEHOLDER]</div>
      <Typography className={classes.subheading}>Merchant Plans</Typography>
      <div className={classes.sectionContainer}>[MERCHANT PLANS PLACEHOLDER]</div>
    </Container>
  );
};

export default MerchantDetailPage;
