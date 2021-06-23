import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ROUTES } from 'constants/routes';
import { LoginCredentials, useAuth } from 'hooks/useAuth';
import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '100%',
    margin: 0,
    padding: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5rem',
    '& h1': {
      fontSize: '3.6rem',
      textAlign: 'center',
      color: '#3f2a56',
    },
  },
  headerRectangle: {
    width: 36,
    height: 6,
    background: '#ff5d43',
    margin: 'auto',
  },
  jumbotron: {
    background: '#fafafa',
    width: '100%',
    padding: '6.4rem 2.4rem',
  },
  form: {
    padding: '3.2rem 2.4rem',
  },
  gridItem: {
    width: '100%',
    '& Button': {
      width: '100%',
      fontFamily: 'Source Sans Pro, sans-serif',
      fontSize: '2.4rem',
      color: 'white',
      background: theme.palette.secondary.main,
      '&:hover': {
        background: '#c7c7c7',
      },
    },
  },
  inputLabel: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#333333',
  },
  inputText: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontSize: '2.4rem',
    lineHeight: 1.25,
    color: '#333333',
  },
  inputLabelAsterisk: {
    display: 'none',
  },
}));

type LoginErrors = {
  username: boolean;
  password: boolean;
};

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const { signIn } = useAuth();

  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    Username: '',
    Password: '',
  });

  const [loginErrors, setLoginErrors] = useState<LoginErrors>({
    username: false,
    password: false,
  });

  const [loading, setLoading] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasUserNameError = !loginForm.Username.length;
    const hasPasswordError = !loginForm.Password.length;

    setLoginErrors((prevErrors) => ({
      ...prevErrors,
      username: hasUserNameError,
      password: hasPasswordError,
    }));

    if (hasUserNameError || hasPasswordError) return;
    setLoading(!hasUserNameError && !hasPasswordError);

    try {
      if (e.currentTarget.checkValidity() && (await signIn(loginForm))) {
        history.push(ROUTES.dashboard);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setOpenErrorAlert(true);
  };

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorAlert(false);
  };

  return (
    <>
      <Container className={classes.container}>
        <div className={classes.jumbotron}>
          <header className={classes.header}>
            <Typography variant="h1">{t('Sign into your account')}</Typography>
          </header>
          <div className={classes.headerRectangle}></div>
        </div>
        <Snackbar
          open={openErrorAlert}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleAlertClose} severity="error" variant="filled">
            Incorrect username or password.
          </Alert>
        </Snackbar>
        <div className={classes.form}>
          <form onSubmit={submitLogin}>
            <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
              <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem}>
                <TextField
                  id="username"
                  error={loginErrors.username}
                  className="username"
                  label={t('Username')}
                  autoComplete="username"
                  fullWidth
                  defaultValue={loginForm.Username}
                  InputProps={{
                    'aria-required': true,
                    'aria-invalid': !loginForm.Username.length,
                    classes: { input: classes.inputText },
                    onChange: (e) =>
                      setLoginForm((prevForm) => ({
                        ...prevForm,
                        Username: e.target.value,
                      })),
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabel, asterisk: classes.inputLabelAsterisk },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem}>
                <TextField
                  error={loginErrors.password}
                  id="password"
                  className="password"
                  type="password"
                  label={t('Password')}
                  autoComplete="current-password"
                  defaultValue={loginForm.Password}
                  fullWidth
                  InputProps={{
                    'aria-required': true,
                    'aria-invalid': !loginForm.Password.length,
                    classes: { input: classes.inputText },
                    onChange: (e) =>
                      setLoginForm((prevForm) => ({
                        ...prevForm,
                        Password: e.target.value,
                      })),
                  }}
                  InputLabelProps={{
                    classes: { root: classes.inputLabel, asterisk: classes.inputLabelAsterisk },
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={11} sm={6} md={4} lg={3} className={classes.gridItem}>
                <Button type="submit" variant="contained" color="primary">
                  {loading ? <CircularProgress /> : t('Login')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
