import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    background: '#fafafa',
    color: theme.palette.secondary.light,
    padding: theme.spacing(2),
  },
  line1: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.2rem',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.17,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#3f2a56',
  },
  line2: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1rem',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.4,
    letterSpacing: 'normal',
    textAlign: 'center',
    color: '#3f2a56',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.footer}>
      <Typography className={classes.line1}>{t('Financing provided by Fairstone')}</Typography>
      <Typography className={classes.line2}>{t('© 2021, ™/® Fairstone Financial Inc.')}</Typography>
    </div>
  );
};

export default Footer;
