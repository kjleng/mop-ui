import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import PageHeader from 'components/PageHeader/PageHeader';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: 36,
    paddingLeft: 41,
    paddingRight: 41,
  },
}));

const Forbidden: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader DisplayText={t('403 Forbidden')} />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="subtitle1">
          {t('Sorry - you do not have access to this page or resource.')}
        </Typography>
      </Container>
    </>
  );
};

export default Forbidden;
