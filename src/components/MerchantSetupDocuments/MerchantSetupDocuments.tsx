import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import MagentoLUMAGuide_EN from 'assets/setup/Fairstone Magento LUMA Plugin Merchant Configuration and User Guide v1_0_ENG.pdf';
import MagentoLUMAGuide_FR from 'assets/setup/Fairstone Magento LUMA Plugin Merchant Configuration and User Guide v1_0_FR.pdf';
import MagentoInstallGuide_EN from 'assets/setup/Fairstone Magento Plugin Installation Guide _v1_0_ENG.pdf';
import MagentoInstallGuide_FR from 'assets/setup/Fairstone Magento Plugin Installation Guide _v1_0_FR.pdf';
import MagentoPWAGuide_EN from 'assets/setup/Fairstone Magento PWA Plugin Merchant Configuration and User Guide v1_0_ENG.pdf';
import MagentoPWAGuide_FR from 'assets/setup/Fairstone Magento PWA Plugin Merchant Configuration and User Guide v1_0_FR.pdf';
import PaymentRESTAPIDoc_FR from 'assets/setup/Fairstone Payment Extension REST API Documentation_FR.pdf';
import PaymentRESTAPIDoc_EN from 'assets/setup/Fairstone Payment Extension REST API Documentation_v1_0_ENG.pdf';
import ShopifyInstallGuide_EN from 'assets/setup/Shopify Fairstone Installation and Configuration Guide_January 2021_V0_03_ENG.pdf';
import ShopifyInstallGuide_FR from 'assets/setup/Shopify Fairstone Installation and Configuration Guide_January 2021_V0_03_FR.pdf';
import ShopifyChecklist_EN from 'assets/setup/Shopify plugin Merchant & Fairstone High Level Setup Check List_January 2021_V0_02_ENG.pdf';
import ShopifyChecklist_FR from 'assets/setup/Shopify plugin Merchant & Fairstone High Level Setup Check List_January 2021_V0_02_FR.pdf';
import clsx from 'clsx';
import DownloadButton from 'components/DownloadButton/DownloadButton';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import Languages from 'enums/languages.enum';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';
import MerchantData from 'interfaces/MerchantData.interface';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    border: '1px solid #606170',
    borderRadius: 5,
    padding: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  spacing: {
    marginBottom: 40,
  },
}));

interface IMerchantSetupDocuments {
  merchantData: MerchantData;
}

const MerchantSetupDocuments: React.FC<IMerchantSetupDocuments> = (
  props: IMerchantSetupDocuments
) => {
  const { merchantData } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const showSpotify = merchantData.answers.platformType === EcommPlatformTypes.Shopify;
  const showMagento = merchantData.answers.platformType === EcommPlatformTypes.Magento;

  const renderShopifyButtons = (lang: Languages) => (
    <>
      <Grid item>
        <DownloadButton
          DisplayText={t(`Shopify Install Guide`)}
          LinkPath={lang === Languages.English ? ShopifyInstallGuide_EN : ShopifyInstallGuide_FR}
        />
      </Grid>
      <Grid item>
        <DownloadButton
          DisplayText={t(`Shopify Checklist`)}
          LinkPath={lang === Languages.English ? ShopifyChecklist_EN : ShopifyChecklist_FR}
        />
      </Grid>
    </>
  );

  const renderMagentoButtons = (lang: Languages) => (
    <>
      <Grid item>
        <DownloadButton
          DisplayText={t(`Magento Install Guide`)}
          LinkPath={lang === Languages.English ? MagentoInstallGuide_EN : MagentoInstallGuide_FR}
        />
      </Grid>
      {merchantData.answers.storefrontPresentation === StorefrontPresentations.LUMA && (
        <Grid item>
          <DownloadButton
            DisplayText={t(`Magento LUMA Guide`)}
            LinkPath={lang === Languages.English ? MagentoLUMAGuide_EN : MagentoLUMAGuide_FR}
          />
        </Grid>
      )}
      {merchantData.answers.storefrontPresentation === StorefrontPresentations.PWA && (
        <>
          <Grid item>
            <DownloadButton
              DisplayText={t(`Magento PWA Guide`)}
              LinkPath={lang === Languages.English ? MagentoPWAGuide_EN : MagentoPWAGuide_FR}
            />
          </Grid>
          <Grid item>
            <DownloadButton
              DisplayText={t(`Payment Extension REST API Documentation`)}
              LinkPath={lang === Languages.English ? PaymentRESTAPIDoc_EN : PaymentRESTAPIDoc_FR}
            />
          </Grid>
        </>
      )}
    </>
  );

  const renderCobrandLogoButtons = (
    <>
      <Grid item sm>
        <Typography variant="body2">
          {t(`Please use the cobranded logo for your setup.`)}
        </Typography>
      </Grid>
      <Grid item sm>
        <Grid container direction="row" spacing={1}>
          <Grid item sm>
            <DownloadButton DisplayText={`EnglishcobrandedLogo.png`} LinkPath="" />
          </Grid>
          <Grid item sm>
            <DownloadButton DisplayText={`FrenchcobrandedLogo.png`} LinkPath="" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const renderSetupDocuments = (
    <Grid container direction="column" justify="flex-start" className={classes.wrapper} spacing={1}>
      <Grid item sm>
        <Typography variant="body2">{t(`Review these documents for the setup.`)}</Typography>
        <br />
      </Grid>
      <Grid container item spacing={1} direction="row">
        <Grid item>
          <Grid container item direction="column">
            <Grid item>
              <Typography variant="h4" style={{ marginBottom: 5 }}>
                {t(`English Version`)}
              </Typography>
            </Grid>
            {showSpotify && renderShopifyButtons(Languages.English)}
            {showMagento && renderMagentoButtons(Languages.English)}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container item direction="column">
            <Grid item>
              <Typography variant="h4" style={{ marginBottom: 5 }}>
                {t(`French Version`)}
              </Typography>
            </Grid>
            {showSpotify && renderShopifyButtons(Languages.French)}
            {showMagento && renderMagentoButtons(Languages.French)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderCobrandDownloadButtons = (
    <Grid
      container
      direction="column"
      justify="flex-start"
      className={clsx(classes.wrapper, classes.spacing)}
      spacing={1}>
      {(merchantData.answers.englishCobrandedLogoLink.length < 1 ||
        merchantData.answers.frenchCobrandedLogoLink.length < 1) && (
        <Grid item sm>
          <Typography variant="body2">
            {t(
              `Fairstone e-commerce team will provide you with the cobranded logo for your setup.`
            )}
          </Typography>
        </Grid>
      )}
      {(merchantData.answers.englishCobrandedLogoLink.length > 0 ||
        merchantData.answers.frenchCobrandedLogoLink.length > 0) &&
        renderCobrandLogoButtons}
    </Grid>
  );

  if (
    merchantData.states.platformDetailsState === 'Complete' ||
    merchantData.states.logoState !== 'Not Started'
  ) {
    return (
      <>
        <Typography variant="h1">{t(`Setup Documents`)}</Typography>
        {merchantData.states.platformDetailsState === 'Complete' &&
          merchantData.answers.platformType !== EcommPlatformTypes.Other &&
          renderSetupDocuments}
        {renderCobrandDownloadButtons}
      </>
    );
  }

  return <></>;
};

export default MerchantSetupDocuments;
