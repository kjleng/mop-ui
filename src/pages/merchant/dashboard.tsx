import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import merchantDataService from '../../api/merchantDataService';
import MerchantDashboardCTA from '../../components/MerchantDashboardCTA/MerchantDashboardCTA';
import MerchantSetupDocuments from '../../components/MerchantSetupDocuments/MerchantSetupDocuments';
import PageHeader from '../../components/PageHeader/PageHeader';
import EcommPlatformTypes from '../../enums/ecommPlatforms.enum';
//import MerchantData from '../../interfaces/MerchantData.interface';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: 36,
    paddingLeft: 41,
    paddingRight: 41,
  },
}));

const MerchantDashboard: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const displaySetupDocuments = true;
  const merchantHash = '5d1dc85a-cf5b-4dbc-b078-4b5a77cd9ff0';
  const [merchantData, setMerchantData] = useState({
    merchantHash: '',
    englishLogoLink: '',
    frenchLogoLink: '',
    englishCobrandLogoLink: '',
    frenchCobrandLogoLink: '',
    ecommPlatform: EcommPlatformTypes.Other,
  });

  useEffect(() => {
    (async () => {
      const data = await merchantDataService.getMerchantByHash(merchantHash);
      setMerchantData(data);
    })();
  }, [merchantHash]);

  return (
    <>
      <PageHeader DisplayText={t(`Welcome to Fairstone`)} LinkPath="" />
      <Container maxWidth="md" className={classes.container}>
        {displaySetupDocuments && <MerchantSetupDocuments merchantData={merchantData} />}
        <Typography variant="h1">{t(`Application`)}</Typography>
        <Typography variant="subtitle1">
          {t(`Please finish the platform details first before you start choosing your plans.`)}
        </Typography>
        <MerchantDashboardCTA
          HeaderText={t(`Platform Details`)}
          BodyText={t(`We will be asking 4 simple questions about your current platform.`)}
          LinkText={t(`Start`)}
          LinkPath="/merchant/questionnaire"
        />
        <MerchantDashboardCTA
          HeaderText={t(`Upload Logo`)}
          BodyText={t(
            `We will need a copy of your company's logo to brand the testing environment.`
          )}
          LinkText={t(`Start`)}
          LinkPath="/merchant/uploadlogo"
        />
      </Container>
    </>
  );
};

export default MerchantDashboard;
