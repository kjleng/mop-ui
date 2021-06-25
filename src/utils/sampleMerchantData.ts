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
  thirdParyPlugin: true,
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
