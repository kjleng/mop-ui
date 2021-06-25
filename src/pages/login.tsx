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
import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { IsAdminUser, IsMerchantUser } from 'utils/token.utils';

type FormFields = {
  Username: string;
  Password: string;
};

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

const Login = () => {
  const history = useHistory();
  const classes = useStyles();
  const { control, handleSubmit, formState } = useForm<FormFields>();
  const { t } = useTranslation();
  const { signIn, getUserSession } = useAuth();

  const { errors } = formState;

  const [loading, setLoading] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const onSubmit = async (cleanValues: FormFields) => {
    setLoading(true);

    try {
      if (await signIn(cleanValues)) {
        const session = getUserSession();

        if (session && IsAdminUser(session)) {
          console.debug('[login.tsx] logged in as ADMIN user');
          history.push(ROUTES.dashboard);
        } else if (session && IsMerchantUser(session)) {
          console.debug('[login.tsx] logged in as MERCHANT user');
          history.push(ROUTES.dashboard); // update once merchant dashboard exists
        }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column" justify="center" alignItems="center" spacing={5}>
              <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem}>
                <Controller
                  name="Username"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="username"
                      error={!!errors.Username}
                      className="username"
                      label={t('Username')}
                      autoComplete="username"
                      fullWidth
                      defaultValue=""
                      InputProps={{
                        'aria-required': true,
                        'aria-invalid': !!errors.Username,
                        classes: { input: classes.inputText },
                      }}
                      onChange={onChange}
                      InputLabelProps={{
                        classes: { root: classes.inputLabel, asterisk: classes.inputLabelAsterisk },
                        shrink: true,
                      }}
                      value={value}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem}>
                <Controller
                  name="Password"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      error={!!errors.Password}
                      id="password"
                      className="password"
                      type="password"
                      label={t('Password')}
                      autoComplete="current-password"
                      defaultValue=""
                      fullWidth
                      InputProps={{
                        'aria-required': true,
                        'aria-invalid': !!errors.Password,
                        classes: { input: classes.inputText },
                      }}
                      onChange={onChange}
                      value={value}
                      InputLabelProps={{
                        classes: { root: classes.inputLabel, asterisk: classes.inputLabelAsterisk },
                        shrink: true,
                      }}
                    />
                  )}
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
