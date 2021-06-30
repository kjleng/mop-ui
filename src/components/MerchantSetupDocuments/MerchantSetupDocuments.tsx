import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import DownloadButton from 'components/DownloadButton/DownloadButton';
import MerchantSetupDocumentsButtons from 'components/MerchantSetupDocumentsButtons/MerchantSetupDocumentsButtons';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
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
      <MerchantSetupDocumentsButtons
        platformType={merchantData.answers.platformType}
        storefrontPresentationType={merchantData.answers.storefrontPresentation}
      />
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
