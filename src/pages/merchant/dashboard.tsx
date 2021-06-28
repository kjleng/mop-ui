import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import merchantDataService from 'api/merchantDataService';
import MerchantDashboardCTA from 'components/MerchantDashboardCTA/MerchantDashboardCTA';
import MerchantSetupDocuments from 'components/MerchantSetupDocuments/MerchantSetupDocuments';
import PageHeader from 'components/PageHeader/PageHeader';
import { ROUTES } from 'constants/routes';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import FSButtonTypes from 'enums/fsbutton.enum';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
    answers: {
      platformType: EcommPlatformTypes.Other,
      storefrontPresentation: StorefrontPresentations.Other,
      shopifyVersion: '',
      shopifyVariantId: '',
      thirdParyPlugin: false,
      thirdPartyPluginDetails: '',
      supportTeamType: '',
      thirdPartyPluginName: '',
      englishLogoLink: '',
      frenchLogoLink: '',
      englishCobrandedLogoLink: '',
      frenchCobrandedLogoLink: '',
    },
    states: {
      logoState: 'Not Started',
      platformDetailsState: 'Not Started',
      planSelectionState: 'Not Started',
    },
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
          {merchantData.states.platformDetailsState === 'Not Started'
            ? t(`Please finish the platform details first before you start choosing your plans.`)
            : ''}
        </Typography>
        <MerchantDashboardCTA
          HeaderText={t(`Platform Details`)}
          BodyText={
            merchantData.states.platformDetailsState === 'Not Started'
              ? t(`We will be asking 4 simple questions about your current platform.`)
              : ''
          }
          LinkText={
            merchantData.states.platformDetailsState === 'Not Started' ? t(`Start`) : t(`Edit`)
          }
          LinkPath={ROUTES.merchantQuestionnaire}
          ButtonType={
            merchantData.states.platformDetailsState === 'Not Started'
              ? FSButtonTypes.Blue
              : FSButtonTypes.White
          }
          ShowCheck={merchantData.states.platformDetailsState === 'Complete'}
        />
        <MerchantDashboardCTA
          HeaderText={t(`Upload Logo`)}
          BodyText={
            merchantData.states.logoState === 'Not Started'
              ? t(`We will need a copy of your company's logo to brand the testing environment.`)
              : ''
          }
          LinkText={merchantData.states.logoState === 'Not Started' ? t(`Start`) : t(`Edit`)}
          LinkPath="/merchant/uploadlogo"
          ButtonType={
            merchantData.states.logoState === 'Not Started'
              ? FSButtonTypes.Blue
              : FSButtonTypes.White
          }
          ShowCheck={merchantData.states.logoState === 'Complete'}
        />
      </Container>
    </>
  );
};

export default MerchantDashboard;
