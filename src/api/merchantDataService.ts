import { AxiosResponse } from 'axios';
import EcommPlatformTypes from 'enums/ecommPlatforms.enum';
import StorefrontPresentations from 'enums/storefrontPresentations.enum';
import MerchantData from 'interfaces/MerchantData.interface';
import { httpRequest } from './http-request';

const getPlatformTypeFromResponse = (value: string) => {
  switch (value.toLocaleLowerCase()) {
    case 'shopify': {
      return EcommPlatformTypes.Shopify;
      break;
    }
    case 'magento': {
      return EcommPlatformTypes.Magento;
      break;
    }
  }
  return EcommPlatformTypes.Other;
};

const getStorefrontPresentationTypeFromResponse = (value: string) => {
  switch (value.toLocaleLowerCase()) {
    case 'luma': {
      return StorefrontPresentations.LUMA;
      break;
    }
    case 'pwa': {
      return StorefrontPresentations.PWA;
      break;
    }
  }
  return StorefrontPresentations.Other;
};

class MerchantDataService {
  getMerchantByHash = async (merchantHash: string): Promise<MerchantData> => {
    const returnData: MerchantData = {
      merchantHash: merchantHash,
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

    const response: void | AxiosResponse<any> = await httpRequest({
      url: `/merchants/${merchantHash}/answers`,
      method: 'GET',
    }).then((res: any) => {
      if (res.data != undefined) {
        returnData.merchantHash = merchantHash;

        returnData.states = {
          logoState: res.data.states.logoState,
          platformDetailsState: res.data.states.platformDetailsState,
          planSelectionState: res.data.states.planSelectionState,
        };

        returnData.answers = {
          platformType: getPlatformTypeFromResponse(res.data.answers.platformType),
          storefrontPresentation: getStorefrontPresentationTypeFromResponse(''),
          shopifyVersion: res.data.answers.shopifyVersion,
          shopifyVariantId: res.data.answers.shopifyVariantId,
          thirdPartyPlugin: res.data.answers.thirdPartyPlugin,
          thirdPartyPluginDetails: res.data.answers.thirdPartyPluginDetails,
          supportTeamType: res.data.answers.supportTeamType,
          thirdPartyPluginName: res.data.answers.thirdPartyPluginName,
          englishLogoLink: res.data.answers.englishLogoLink,
          frenchLogoLink: res.data.answers.frenchLogoLink,
          englishCobrandedLogoLink: '',
          frenchCobrandedLogoLink: '',
        };
      }
    });

    return returnData;
  };
}

export default new MerchantDataService();
