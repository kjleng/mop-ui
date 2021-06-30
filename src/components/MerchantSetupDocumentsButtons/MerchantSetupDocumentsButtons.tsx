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
import DownloadButton from 'components/DownloadButton/DownloadButton';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import Languages from 'enums/languages.enum';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface MerchantSetupDocumentsButtonsProps {
  platformType: EcommPlatformTypes;
  storefrontPresentationType?: StorefrontPresentations;
}

const MerchantSetupDocumentsButtons: React.FC<MerchantSetupDocumentsButtonsProps> = ({
  platformType,
  storefrontPresentationType,
}: MerchantSetupDocumentsButtonsProps) => {
  const { t } = useTranslation();
  const showSpotify = platformType === EcommPlatformTypes.Shopify;
  const showMagento = platformType === EcommPlatformTypes.Magento;

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
      {storefrontPresentationType === StorefrontPresentations.LUMA && (
        <Grid item>
          <DownloadButton
            DisplayText={t(`Magento LUMA Guide`)}
            LinkPath={lang === Languages.English ? MagentoLUMAGuide_EN : MagentoLUMAGuide_FR}
          />
        </Grid>
      )}
      {storefrontPresentationType === StorefrontPresentations.PWA && (
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

  if (platformType === EcommPlatformTypes.Other) {
    return null;
  }

  return (
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
  );
};

export default MerchantSetupDocumentsButtons;
