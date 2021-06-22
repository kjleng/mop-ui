import EcommPlatformTypes from '../enums/ecommPlatforms.enum';

export default interface MerchantData {
  merchantHash: string;
  englishLogoLink: string;
  frenchLogoLink: string;
  englishCobrandLogoLink: string;
  frenchCobrandLogoLink: string;
  ecommPlatform: EcommPlatformTypes;
}
