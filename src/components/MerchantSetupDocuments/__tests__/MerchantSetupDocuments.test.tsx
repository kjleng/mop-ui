import { cleanup, render, screen } from '@testing-library/react';
import MerchantSetupDocuments from 'components/MerchantSetupDocuments/MerchantSetupDocuments';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import React from 'react';
import { sampleMerchantData } from 'utils/sampleMerchantData';

jest.mock('react-i18next');

describe('<MerchantSetupDocuments />', () => {
  afterEach(cleanup);

  test('should display setup documents', () => {
    sampleMerchantData.answers.platformType = EcommPlatformTypes.Shopify;
    sampleMerchantData.states.platformDetailsState = 'Complete';

    render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    expect(screen.queryAllByText('Shopify Install Guide').length === 2).toBe(true);
  });

  test('should display download links for merchant cobranded logos', () => {
    const englishFileName = 'EnglishcobrandedLogo.png';
    const frenchFileName = 'FrenchcobrandedLogo.png';
    sampleMerchantData.answers.englishCobrandedLogoLink = englishFileName;
    sampleMerchantData.answers.frenchCobrandedLogoLink = frenchFileName;

    render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    const englishCobrandLogoLinkTexts = screen.queryAllByText(englishFileName);
    const frenchCobrandLogoLinkTexts = screen.queryAllByText(frenchFileName);

    expect(
      screen.queryByText(
        'Fairstone e-commerce team will provide you with the cobranded logo for your setup.'
      )
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Please use the cobranded logo for your setup.')).toBeInTheDocument();
    expect(englishCobrandLogoLinkTexts.length === 1).toBe(true);
    expect(frenchCobrandLogoLinkTexts.length === 1).toBe(true);
  });

  test('should display setup prompt if no cobranded logos are available', () => {
    sampleMerchantData.answers.englishCobrandedLogoLink = '';
    sampleMerchantData.answers.frenchCobrandedLogoLink = '';
    sampleMerchantData.states.logoState = 'In Progress';

    render(<MerchantSetupDocuments merchantData={sampleMerchantData} />);

    expect(
      screen.queryByText(
        'Fairstone e-commerce team will provide you with the cobranded logo for your setup.'
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Please use the cobranded logo for your setup.')
    ).not.toBeInTheDocument();
  });
});
