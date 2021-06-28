import { sampleMerchantData } from 'utils/sampleMerchantData';
import EcommPlatformTypes from '../enums/ecommPlatforms.enum';
import MerchantData from '../interfaces/MerchantData.interface';

class MerchantDataService {
  getMerchantByHash = async (merchantHash: string): Promise<MerchantData> => {
    const returnData: MerchantData = sampleMerchantData;

    return returnData;
  };
}

export default new MerchantDataService();
