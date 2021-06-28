import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader/PageHeader';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: 36,
    paddingLeft: 41,
    paddingRight: 41,
  },
}));

const PageNotFound: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader DisplayText={t(`Page Not Found`)} LinkPath="" />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="subtitle1">
          {t(`The page you are looking for could not be found.`)}
        </Typography>
      </Container>
    </>
  );
};

export default PageNotFound;
