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

const QuestionnairePage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <PageHeader DisplayText={t(`Platform Details`)} LinkPath="/merchant/dashboard" />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h1">{t(`Questionnaire Page`)}</Typography>
      </Container>
    </>
  );
};

export default QuestionnairePage;
