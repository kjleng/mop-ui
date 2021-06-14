import React from 'react';
import { useTranslation } from 'react-i18next';
import { AddMerchantModal } from '../components/AddMerchantModal/AddMerchantModal';

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <AddMerchantModal isOpen={true} />
    </>
  );
};

export default DashboardPage;
