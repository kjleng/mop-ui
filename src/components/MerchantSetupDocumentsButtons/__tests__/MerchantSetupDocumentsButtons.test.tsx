import { cleanup, render, screen } from '@testing-library/react';
import MerchantSetupDocumentsButtons from 'components/MerchantSetupDocumentsButtons/MerchantSetupDocumentsButtons';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';
import React from 'react';
import { sampleMerchantData } from 'utils/sampleMerchantData';

jest.mock('react-i18next');

describe('<MerchantSetupDocumentsButtons />', () => {
  afterEach(cleanup);

  it('should display Shopify documents if platform type is Shopify', () => {
    sampleMerchantData.answers.platformType = EcommPlatformTypes.Shopify;
    sampleMerchantData.states.platformDetailsState = 'Complete';

    render(<MerchantSetupDocumentsButtons platformType={EcommPlatformTypes.Shopify} />);

    const ShopifySetupGuideTexts = screen.queryAllByText('Shopify Install Guide');
    const ShopifyChecklistTexts = screen.queryAllByText('Shopify Checklist');
    const MagentoSetupGuideTexts = screen.queryAllByText('Magento Install Guide');
    const MagentoLumaGuideTexts = screen.queryAllByText('Magento LUMA Guide');
    const MagentoPWAGuideTexts = screen.queryAllByText('Magento PWA Guide');
    const MagentoRESTTexts = screen.queryAllByText('Payment Extension REST API Documentation');

    expect(ShopifySetupGuideTexts.length === 2).toBe(true);
    expect(ShopifyChecklistTexts.length === 2).toBe(true);
    expect(MagentoSetupGuideTexts.length === 0).toBe(true);
    expect(MagentoLumaGuideTexts.length === 0).toBe(true);
    expect(MagentoPWAGuideTexts.length === 0).toBe(true);
    expect(MagentoRESTTexts.length === 0).toBe(true);
  });

  it('should display Magento documents if platform type is Magento with LUMA', () => {
    render(
      <MerchantSetupDocumentsButtons
        platformType={EcommPlatformTypes.Magento}
        storefrontPresentationType={StorefrontPresentations.LUMA}
      />
    );

    const ShopifySetupGuideTexts = screen.queryAllByText('Shopify Install Guide');
    const ShopifyChecklistTexts = screen.queryAllByText('Shopify Checklist');
    const MagentoSetupGuideTexts = screen.queryAllByText('Magento Install Guide');
    const MagentoLumaGuideTexts = screen.queryAllByText('Magento LUMA Guide');
    const MagentoPWAGuideTexts = screen.queryAllByText('Magento PWA Guide');
    const MagentoRESTTexts = screen.queryAllByText('Payment Extension REST API Documentation');

    expect(ShopifySetupGuideTexts.length === 0).toBe(true);
    expect(ShopifyChecklistTexts.length === 0).toBe(true);
    expect(MagentoSetupGuideTexts.length === 2).toBe(true);
    expect(MagentoLumaGuideTexts.length === 2).toBe(true);
    expect(MagentoPWAGuideTexts.length === 0).toBe(true);
    expect(MagentoRESTTexts.length === 0).toBe(true);
  });

  it('should display Magento documents if platform type is Magento with PWA', () => {
    render(
      <MerchantSetupDocumentsButtons
        platformType={EcommPlatformTypes.Magento}
        storefrontPresentationType={StorefrontPresentations.PWA}
      />
    );

    const ShopifySetupGuideTexts = screen.queryAllByText('Shopify Install Guide');
    const ShopifyChecklistTexts = screen.queryAllByText('Shopify Checklist');
    const MagentoSetupGuideTexts = screen.queryAllByText('Magento Install Guide');
    const MagentoLumaGuideTexts = screen.queryAllByText('Magento LUMA Guide');
    const MagentoPWAGuideTexts = screen.queryAllByText('Magento PWA Guide');
    const MagentoRESTTexts = screen.queryAllByText('Payment Extension REST API Documentation');

    expect(ShopifySetupGuideTexts.length === 0).toBe(true);
    expect(ShopifyChecklistTexts.length === 0).toBe(true);
    expect(MagentoSetupGuideTexts.length === 2).toBe(true);
    expect(MagentoLumaGuideTexts.length === 0).toBe(true);
    expect(MagentoPWAGuideTexts.length === 2).toBe(true);
    expect(MagentoRESTTexts.length === 2).toBe(true);
  });
});
