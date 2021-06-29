import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';
import MerchantData from 'interfaces/MerchantData.interface';
import PlatformDetailsData from 'interfaces/PlatformDetailsData.interface';
import WorkflowStateData from 'interfaces/WorkflowStatesData.interface';

export const samplePlatformDetailsData: PlatformDetailsData = {
  platformType: EcommPlatformTypes.Magento,
  storefrontPresentation: StorefrontPresentations.LUMA,
  shopifyVersion: 'v1.8.8',
  shopifyVariantId: '123o8u98',
  thirdPartyPlugin: true,
  thirdPartyPluginDetails: 'Support Company',
  supportTeamType: '3rd Party Integrator',
  thirdPartyPluginName: 'EasyIntegration',
  englishLogoLink: 's3://aws.com/image',
  frenchLogoLink: 's3://aws.com/image2',
  englishCobrandedLogoLink: 's3://aws.com/image3',
  frenchCobrandedLogoLink: 's3://aws.com/image4',
};

export const sampleWorkflowStateData: WorkflowStateData = {
  logoState: 'In Progress',
  platformDetailsState: 'Complete',
  planSelectionState: 'Not Started',
};

export const sampleMerchantData: MerchantData = {
  merchantHash: `sample-5d1dc85a-cf5b-4dbc-b078-4b5a77cd9ff0`,
  answers: samplePlatformDetailsData,
  states: sampleWorkflowStateData,
};

const sampleMerchantData_1: MerchantData = {
  merchantHash: `sample-5d1dc85a-cf5b-4dbc-b078-4b5a77cd9ff0`,
  answers: {
    platformType: EcommPlatformTypes.Other,
    storefrontPresentation: StorefrontPresentations.Other,
    shopifyVersion: '',
    shopifyVariantId: '',
    thirdPartyPlugin: false,
    thirdPartyPluginDetails: '',
    supportTeamType: '',
    thirdPartyPluginName: '',
    englishLogoLink: '',
    frenchLogoLink: '',
    englishCobrandedLogoLink: '',
    frenchCobrandedLogoLink: '',
  },
  states: {
    logoState: 'Not Started',
    platformDetailsState: 'Not Started',
    planSelectionState: 'Not Started',
  },
};

const sampleMerchantData_2: MerchantData = {
  merchantHash: `sample-5d1dc85a-cf5b-4dbc-b078-4b5a77cd9ff0`,
  answers: {
    platformType: EcommPlatformTypes.Magento,
    storefrontPresentation: StorefrontPresentations.PWA,
    shopifyVersion: '',
    shopifyVariantId: '',
    thirdPartyPlugin: false,
    thirdPartyPluginDetails: '',
    supportTeamType: '',
    thirdPartyPluginName: '',
    englishLogoLink: '',
    frenchLogoLink: '',
    englishCobrandedLogoLink: '',
    frenchCobrandedLogoLink: '',
  },
  states: {
    logoState: 'Not Started',
    platformDetailsState: 'In Progress',
    planSelectionState: 'Not Started',
  },
};

const sampleMerchantData_3: MerchantData = {
  merchantHash: `sample-5d1dc85a-cf5b-4dbc-b078-4b5a77cd9ff0`,
  answers: {
    platformType: EcommPlatformTypes.Magento,
    storefrontPresentation: StorefrontPresentations.LUMA,
    shopifyVersion: 'v1.8.8',
    shopifyVariantId: '123o8u98',
    thirdPartyPlugin: true,
    thirdPartyPluginDetails: 'Support Company',
    supportTeamType: '3rd Party Integrator',
    thirdPartyPluginName: 'EasyIntegration',
    englishLogoLink: '',
    frenchLogoLink: '',
    englishCobrandedLogoLink: '',
    frenchCobrandedLogoLink: '',
  },
  states: {
    logoState: 'Not Started',
    platformDetailsState: 'Complete',
    planSelectionState: 'Not Started',
  },
};

const sampleMerchantData_4: MerchantData = {
  merchantHash: `sample-5d1dc85a-cf5b-4dbc-b078-4b5a77cd9ff0`,
  answers: {
    platformType: EcommPlatformTypes.Magento,
    storefrontPresentation: StorefrontPresentations.PWA,
    shopifyVersion: 'v1.8.8',
    shopifyVariantId: '123o8u98',
    thirdPartyPlugin: true,
    thirdPartyPluginDetails: 'Support Company',
    supportTeamType: '3rd Party Integrator',
    thirdPartyPluginName: 'EasyIntegration',
    englishLogoLink: 's3://aws.com/image',
    frenchLogoLink: 's3://aws.com/image2',
    englishCobrandedLogoLink: '',
    frenchCobrandedLogoLink: '',
  },
  states: {
    logoState: 'In Progress',
    platformDetailsState: 'Complete',
    planSelectionState: 'Not Started',
  },
};

const sampleMerchantData_5: MerchantData = {
  merchantHash: `sample-5d1dc85a-cf5b-4dbc-b078-4b5a77cd9ff0`,
  answers: {
    platformType: EcommPlatformTypes.Shopify,
    storefrontPresentation: StorefrontPresentations.LUMA,
    shopifyVersion: 'v1.8.8',
    shopifyVariantId: '123o8u98',
    thirdPartyPlugin: true,
    thirdPartyPluginDetails: 'Support Company',
    supportTeamType: '3rd Party Integrator',
    thirdPartyPluginName: 'EasyIntegration',
    englishLogoLink: 's3://aws.com/image',
    frenchLogoLink: 's3://aws.com/image2',
    englishCobrandedLogoLink: 's3://aws.com/image3',
    frenchCobrandedLogoLink: 's3://aws.com/image4',
  },
  states: {
    logoState: 'Complete',
    platformDetailsState: 'Complete',
    planSelectionState: 'Not Started',
  },
};

// 1= First Visit
// 2= Selected Platform not didn't finish questionnaire
// 3= completed questionnaire
// 4= uploaded logos
// 5= uploaded cobranded logos
