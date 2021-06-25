import { cleanup, render, act } from '@testing-library/react';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';
import React from 'react';
import EcommPlatformTypes from '../../../enums/ecommPlatforms.enum';
import { sampleMerchantData } from '../../../utils/sampleMerchantData';
import MerchantSetupDocuments from '../MerchantSetupDocuments';

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
    sampleMerchantData.answers.platformType = EcommPlatformTypes.Shopify;
    sampleMerchantData.states.platformDetailsState = 'Complete';
    const { queryAllByText } = render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const ShopifySetupGuideTexts = queryAllByText('Shopify Install Guide');
    const ShopifyChecklistTexts = queryAllByText('Shopify Checklist');
    const MagentoSetupGuideTexts = queryAllByText('Magento Install Guide');
    const MagentoLumaGuideTexts = queryAllByText('Magento LUMA Guide');
    const MagentoPWAGuideTexts = queryAllByText('Magento PWA Guide');
    const MagentoRESTTexts = queryAllByText('Payment Extension REST API Documentation');

    expect(ShopifySetupGuideTexts.length === 2).toBe(true);
    expect(ShopifyChecklistTexts.length === 2).toBe(true);
    expect(MagentoSetupGuideTexts.length === 0).toBe(true);
    expect(MagentoLumaGuideTexts.length === 0).toBe(true);
    expect(MagentoPWAGuideTexts.length === 0).toBe(true);
    expect(MagentoRESTTexts.length === 0).toBe(true);
  });

  test('render_MerchantSetupDocuments_DisplayMagentoLinksIfMagentoProviderSelectedWithLUMA', () => {
    sampleMerchantData.answers.platformType = EcommPlatformTypes.Magento;
    sampleMerchantData.answers.storefrontPresentation = StorefrontPresentations.LUMA;
    sampleMerchantData.states.platformDetailsState = 'Complete';
    const { queryAllByText } = render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const ShopifySetupGuideTexts = queryAllByText('Shopify Install Guide');
    const ShopifyChecklistTexts = queryAllByText('Shopify Checklist');
    const MagentoSetupGuideTexts = queryAllByText('Magento Install Guide');
    const MagentoLumaGuideTexts = queryAllByText('Magento LUMA Guide');
    const MagentoPWAGuideTexts = queryAllByText('Magento PWA Guide');
    const MagentoRESTTexts = queryAllByText('Payment Extension REST API Documentation');

    expect(ShopifySetupGuideTexts.length === 0).toBe(true);
    expect(ShopifyChecklistTexts.length === 0).toBe(true);
    expect(MagentoSetupGuideTexts.length === 2).toBe(true);
    expect(MagentoLumaGuideTexts.length === 2).toBe(true);
    expect(MagentoPWAGuideTexts.length === 0).toBe(true);
    expect(MagentoRESTTexts.length === 0).toBe(true);
  });

  test('render_MerchantSetupDocuments_DisplayMagentoLinksIfMagentoProviderSelectedWithPWA', () => {
    sampleMerchantData.answers.platformType = EcommPlatformTypes.Magento;
    sampleMerchantData.answers.storefrontPresentation = StorefrontPresentations.PWA;
    sampleMerchantData.states.platformDetailsState = 'Complete';
    const { queryAllByText } = render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const ShopifySetupGuideTexts = queryAllByText('Shopify Install Guide');
    const ShopifyChecklistTexts = queryAllByText('Shopify Checklist');
    const MagentoSetupGuideTexts = queryAllByText('Magento Install Guide');
    const MagentoLumaGuideTexts = queryAllByText('Magento LUMA Guide');
    const MagentoPWAGuideTexts = queryAllByText('Magento PWA Guide');
    const MagentoRESTTexts = queryAllByText('Payment Extension REST API Documentation');

    expect(ShopifySetupGuideTexts.length === 0).toBe(true);
    expect(ShopifyChecklistTexts.length === 0).toBe(true);
    expect(MagentoSetupGuideTexts.length === 2).toBe(true);
    expect(MagentoLumaGuideTexts.length === 0).toBe(true);
    expect(MagentoPWAGuideTexts.length === 2).toBe(true);
    expect(MagentoRESTTexts.length === 2).toBe(true);
  });

  test('render_MerchantSetupDocuments_DisplayCobrandLogoDownload', () => {
    const englishFileName = 'EnglishcobrandedLogo.png';
    const frenchFileName = 'FrenchcobrandedLogo.png';
    sampleMerchantData.answers.englishCobrandedLogoLink = englishFileName;
    sampleMerchantData.answers.frenchCobrandedLogoLink = frenchFileName;
    const { queryByText, queryAllByText } = render(
      <MerchantSetupDocuments merchantData={sampleMerchantData} />
    );

    const englishCobrandLogoLinkTexts = queryAllByText(englishFileName);
    const frenchCobrandLogoLinkTexts = queryAllByText(frenchFileName);

    expect(
      queryByText(
        'Fairstone e-commerce team will provide you with the cobranded logo for your setup.'
      )
    ).not.toBeInTheDocument();
    expect(queryByText('Please use the cobranded logo for your setup.')).toBeInTheDocument();
    expect(englishCobrandLogoLinkTexts.length === 1).toBe(true);
    expect(frenchCobrandLogoLinkTexts.length === 1).toBe(true);
  });

  test('render_MerchantSetupDocuments_DisplaySetupPromptIfNoCobrandLogo', () => {
    const englishFileName = '';
    const frenchFileName = '';
    sampleMerchantData.answers.englishCobrandedLogoLink = englishFileName;
    sampleMerchantData.answers.frenchCobrandedLogoLink = frenchFileName;
    sampleMerchantData.states.logoState = 'In Progress';
    const { queryByText, queryAllByText } = render(
      <MerchantSetupDocuments merchantData={sampleMerchantData} />
    );

    const englishCobrandLogoLinkTexts = queryAllByText(englishFileName);
    const frenchCobrandLogoLinkTexts = queryAllByText(frenchFileName);

    expect(
      queryByText(
        'Fairstone e-commerce team will provide you with the cobranded logo for your setup.'
      )
    ).toBeInTheDocument();
    expect(queryByText('Please use the cobranded logo for your setup.')).not.toBeInTheDocument();
  });
});
