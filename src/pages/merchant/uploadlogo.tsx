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

const UploadLogoPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader DisplayText={t(`Upload Logo`)} LinkPath="/merchant/dashboard" />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h1">{t(`Upload Logo`)}</Typography>
        <Typography variant="subtitle1">
          {t(`This will eventually be replaced with a modal window.`)}
        </Typography>
      </Container>
    </>
  );
};

export default UploadLogoPage;
