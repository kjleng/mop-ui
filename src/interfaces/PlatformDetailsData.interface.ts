import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';

export default interface PlatformDetailsData {
  platformType: EcommPlatformTypes;
  storefrontPresentation: StorefrontPresentations;
  shopifyVersion: string;
  shopifyVariantId: string;
  thirdPartyPlugin: boolean;
  thirdPartyPluginDetails: string;
  supportTeamType: string;
  thirdPartyPluginName: string;
  englishLogoLink: string;
  frenchLogoLink: string;
  englishCobrandedLogoLink: string;
  frenchCobrandedLogoLink: string;
}
