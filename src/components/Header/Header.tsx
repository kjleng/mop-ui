import { AppBar, makeStyles, Theme, Toolbar } from '@material-ui/core';
import LanguageChangeButton from 'components/LanguageChangeButton/LanguageChangeButton';
import LogoutButton from 'components/LogoutButton/LogoutButton';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { Link } from 'react-router-dom';
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
    minHeight: '4.8rem',
  },
  logoContainer: {
    gridColumnStart: 1,
    justifySelf: 'left',
    alignSelf: 'center',
  },
  logo: {
    color: theme.palette.primary.main,
  },
  menuButton: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '2rem',
    textAlign: 'center',
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <div className={classes.container}>
        <Link to={ROUTES.dashboard} className={classes.logoContainer}>
          <img src={logo} className={classes.logo} alt="Fairstone logo" />
        </Link>
        <Toolbar className={classes.toolbar}>
          <LanguageChangeButton />
          <LogoutButton />
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Header;
