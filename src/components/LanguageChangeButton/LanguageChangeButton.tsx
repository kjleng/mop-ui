import { Button, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '2rem',
    textAlign: 'center',
    minWidth: 'auto',
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
    const newLang = nextLang();
    i18n.changeLanguage(newLang.toLowerCase());
    document.documentElement.lang = newLang;
  };

  return (
    <Button color="inherit" className={classes.menuButton} onClick={toggleLang}>
      {nextLang().toUpperCase()}
    </Button>
  );
};

export default LanguageChangeButton;
