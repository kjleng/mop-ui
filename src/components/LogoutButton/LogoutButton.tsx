import { Button, Divider, makeStyles, Theme } from '@material-ui/core';
import { ROUTES } from 'constants/routes';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '2rem',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
}));

const LogoutButton = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { isAuthenticated, signOut } = useAuth();

  const [visible, setVisible] = useState(false);

  useEffect(() => setVisible(isAuthenticated()), [isAuthenticated]);

  const logout = () => {
    signOut();
    setVisible(false);
    history.push(ROUTES.login);
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Button color="inherit" className={classes.menuButton} onClick={logout}>
        {t('Logout')}
      </Button>
    </>
  );
};

export default LogoutButton;
