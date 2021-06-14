import { useTranslation } from 'react-i18next';

const MerchantDetailsPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t('Merchant Details page')}</h1>
        </>
    )
};

export default MerchantDetailsPage;
