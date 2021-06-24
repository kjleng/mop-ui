import EcommPlatformTypes from '../enums/ecommPlatforms.enum';
import MerchantData from '../interfaces/MerchantData.interface';

class MerchantDataService {
  getMerchantByHash = async (merchantHash: string): Promise<MerchantData> => {
    const returnData: MerchantData = {
      merchantHash: `aaa-${merchantHash}`,
      englishLogoLink: '',
      frenchLogoLink: '',
      englishCobrandLogoLink: '',
      frenchCobrandLogoLink: '',
      ecommPlatform: EcommPlatformTypes.Shopify,
    };

    return returnData;
  };
}

export default new MerchantDataService();
