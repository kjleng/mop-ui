import React from 'react';
import MerchantSetupDocuments from '../MerchantSetupDocuments';
import { cleanup, render, act } from '@testing-library/react';
import { sampleMerchantData } from '../../../utils/sampleMerchantData';
import EcommPlatformTypes from '../../../enums/ecommPlatforms.enum';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            return undefined;
          }),
      },
    };
  },
}));

describe('Unit Tests', () => {
  afterEach(cleanup);

  test('render_MerchantSetupDocuments_DisplayShopifyLinksIfShopifyProviderSelected', () => {
    sampleMerchantData.ecommPlatform = EcommPlatformTypes.Shopify;
    const { queryAllByText } = render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const ShopifySetupGuideTexts = queryAllByText('ShopifySetupGuide.pdf');
    const ShopifyHandbookTexts = queryAllByText('ShopifyHandbook.pdf');
    const MagentoSetupGuideTexts = queryAllByText('MagentoSetupGuide.pdf');
    const MagentoHandbookTexts = queryAllByText('MagentoHandbook.pdf');

    expect(ShopifySetupGuideTexts.length === 2).toBe(true);
    expect(ShopifyHandbookTexts.length === 2).toBe(true);
    expect(MagentoSetupGuideTexts.length === 0).toBe(true);
    expect(MagentoHandbookTexts.length === 0).toBe(true);
  });

  test('render_MerchantSetupDocuments_DisplayMagentoLinksIfMagentoProviderSelected', () => {
    sampleMerchantData.ecommPlatform = EcommPlatformTypes.Magento;
    const { queryAllByText } = render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const ShopifySetupGuideTexts = queryAllByText('ShopifySetupGuide.pdf');
    const ShopifyHandbookTexts = queryAllByText('ShopifyHandbook.pdf');
    const MagentoSetupGuideTexts = queryAllByText('MagentoSetupGuide.pdf');
    const MagentoHandbookTexts = queryAllByText('MagentoHandbook.pdf');

    expect(ShopifySetupGuideTexts.length === 0).toBe(true);
    expect(ShopifyHandbookTexts.length === 0).toBe(true);
    expect(MagentoSetupGuideTexts.length === 2).toBe(true);
    expect(MagentoHandbookTexts.length === 2).toBe(true);
  });

  test('render_MerchantSetupDocuments_DisplayCobrandLogoDownload', () => {
    const englishFileName = 'EnglishcobrandedLogo.png';
    const frenchFileName = 'FrenchcobrandedLogo.png';
    sampleMerchantData.englishCobrandLogoLink = englishFileName;
    sampleMerchantData.frenchCobrandLogoLink = frenchFileName;
    const { queryByText , queryAllByText } = render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const englishCobrandLogoLinkTexts = queryAllByText(englishFileName);
    const frenchCobrandLogoLinkTexts = queryAllByText(frenchFileName);

    expect(queryByText('Fairstone e-commerce team will provide you with the cobranded logo for your setup.')).not.toBeInTheDocument();
    expect(queryByText('Please use the cobranded logo for your setup.')).toBeInTheDocument();
    expect(englishCobrandLogoLinkTexts.length === 1).toBe(true);
    expect(frenchCobrandLogoLinkTexts.length === 1).toBe(true);

  });

  test('render_MerchantSetupDocuments_DisplaySetupPromptIfNoCobrandLogo', () => {
    const englishFileName = '';
    const frenchFileName = '';
    sampleMerchantData.englishCobrandLogoLink = englishFileName;
    sampleMerchantData.frenchCobrandLogoLink = frenchFileName;
    const { queryByText, queryAllByText } = render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const englishCobrandLogoLinkTexts = queryAllByText(englishFileName);
    const frenchCobrandLogoLinkTexts = queryAllByText(frenchFileName);

    expect(queryByText('Fairstone e-commerce team will provide you with the cobranded logo for your setup.')).toBeInTheDocument();
    expect(queryByText('Please use the cobranded logo for your setup.')).not.toBeInTheDocument();

  });
});
