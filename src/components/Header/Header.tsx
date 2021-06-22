import { AppBar, Toolbar, Button, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import LanguageChangeButton from '../LanguageChangeButton/LanguageChangeButton';
import logo from './fairstone_header_logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    background: '#ffffff',
    color: theme.palette.secondary.light,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '25% auto 25%',
    // padding: '1.4rem 2.4rem', this is causing the height of the container to be taller than the gutter used for page position which results in having the page content appear underneath the header bar
  },
  toolbar: {
    gridColumnStart: 3,
    justifySelf: 'right',
    alignSelf: 'center',
  },
  logo: {
    gridColumnStart: 1,
    color: '#3f2a56',
    justifySelf: 'left',
    alignSelf: 'center',
  },
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

const Header = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navItems = [
    {
      label: t('Login'),
      href: '/home',
    },
  ];

  const getNavButtons = () => {
    return navItems.map(({ label, href }) => {
      return (
        <Button
          key={label}
          {...{
            color: 'inherit',
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}>
          {label}
        </Button>
      );
    });
  };

  return (
    <AppBar className={classes.appBar}>
      <div className={classes.container}>
        <img src={logo} className={classes.logo} alt="Fairstone logo" />

        <Toolbar className={classes.toolbar}>
          <LanguageChangeButton />
          {getNavButtons()}
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
