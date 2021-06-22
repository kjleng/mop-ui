import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EcommPlatformTypes from '../../enums/ecommPlatforms.enum';
import MerchantData from '../../interfaces/MerchantData.interface';
import DownloadButton from '../DownloadButton/DownloadButton';

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
  const showSpotify = merchantData.ecommPlatform === EcommPlatformTypes.Shopify;
  const showMagento = merchantData.ecommPlatform === EcommPlatformTypes.Magento;

  const renderShopifyButtons = (
    <>
      <Grid item>
        <DownloadButton DisplayText={t(`ShopifySetupGuide.pdf`)} />
      </Grid>
      <Grid item>
        <DownloadButton DisplayText={t(`ShopifyHandbook.pdf`)} />
      </Grid>
    </>
  );

  const renderMagentoButtons = (
    <>
      <Grid item>
        <DownloadButton DisplayText={t(`MagentoSetupGuide.pdf`)} />
      </Grid>
      <Grid item>
        <DownloadButton DisplayText={t(`MagentoHandbook.pdf`)} />
      </Grid>
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
            <DownloadButton DisplayText={`EnglishcobrandedLogo.png`} />
          </Grid>
          <Grid item sm>
            <DownloadButton DisplayText={`FrenchcobrandedLogo.png`} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <Typography variant="h1">{t(`Setup Documents`)}</Typography>
      <Grid
        container
        direction="column"
        justify="flex-start"
        className={classes.wrapper}
        spacing={1}>
        <Grid item sm>
          <Typography variant="body2">{t(`Review these documents for the setup.`)}</Typography>
          <br />
        </Grid>
        <Grid container item spacing={1} direction="row">
          <Grid item>
            <Grid container item direction="column">
              <Grid item>
                <Typography variant="h4">{t(`English Version`)}</Typography>
              </Grid>
              {showSpotify && renderShopifyButtons}
              {showMagento && renderMagentoButtons}
            </Grid>
          </Grid>
          <Grid item>
            <Grid container item direction="column">
              <Grid item>
                <Typography variant="h4">{t(`French Version`)}</Typography>
              </Grid>
              {showSpotify && renderShopifyButtons}
              {showMagento && renderMagentoButtons}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        className={clsx(classes.wrapper, classes.spacing)}
        spacing={1}>
        {(merchantData.englishCobrandLogoLink.length < 1 ||
          merchantData.frenchCobrandLogoLink.length < 1) && (
          <Grid item sm>
            <Typography variant="body2">
              {t(
                `Fairstone e-commerce team will provide you with the cobranded logo for your setup.`
              )}
            </Typography>
          </Grid>
        )}
        {(merchantData.englishCobrandLogoLink.length > 0 ||
          merchantData.frenchCobrandLogoLink.length > 0) &&
          renderCobrandLogoButtons}
      </Grid>
    </>
  );
};

export default MerchantSetupDocuments;
