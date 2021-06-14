import { Button, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    color: '#3f2a56',
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 600,
    fontSize: '2rem',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
  },
}));

const LanguageChangeButton = () => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const nextLang = () => {
    const currentLang = i18n.language;
    const regex = new RegExp('^en');

    return regex.test(currentLang) ? 'fr' : 'en';
  };

  const toggleLang = () => {
    i18n.changeLanguage(nextLang().toLowerCase());
  };

  return (
    <Button color="inherit" className={classes.menuButton} onClick={toggleLang}>
      {nextLang().toUpperCase()}
    </Button>
  );
};

export default LanguageChangeButton;
