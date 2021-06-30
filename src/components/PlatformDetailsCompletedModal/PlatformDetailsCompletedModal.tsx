import { makeStyles, Typography } from '@material-ui/core';
import MerchantSetupDocumentsButtons from 'components/MerchantSetupDocumentsButtons/MerchantSetupDocumentsButtons';
import { Modal } from 'components/Modal/Modal';
import { ROUTES } from 'constants/routes';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import { StorefrontPresentations } from 'enums/storefrontPresentations.enum';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

interface PlatformDetailsCompletedModalProps {
  isOpen: boolean;
  platformType: EcommPlatformTypes;
  storefrontPresentationType: StorefrontPresentations;
}

const useStyles = makeStyles((theme) => ({
  text: {
    paddingBottom: '1.8rem',
  },
}));

const PlatformDetailsCompletedModal: FC<PlatformDetailsCompletedModalProps> = ({
  isOpen,
  platformType,
  storefrontPresentationType,
}: PlatformDetailsCompletedModalProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const showButtons = platformType !== EcommPlatformTypes.Other;

  const handleClose = () => history.push(ROUTES.merchantDetails);

  const renderButtons = () => (
    <>
      <Typography variant="body2" className={classes.text}>
        {t(
          'Please review the following PDFs to continue the setup process. You can also find these documents in your dashboard.'
        )}
      </Typography>
      <MerchantSetupDocumentsButtons
        platformType={platformType}
        storefrontPresentationType={storefrontPresentationType}
      />
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      title={t('Platform Details Completed')}
      closeCallback={handleClose}
      disableClickaway
      showPrimaryAction>
      {showButtons ? (
        renderButtons()
      ) : (
        <Typography variant="body2">
          {t('Thank you. Our e-comm team will follow up with you in the next couple days.')}
        </Typography>
      )}
    </Modal>
  );
};

export default PlatformDetailsCompletedModal;
