import { MerchantUser } from '../types/merchants.types';
import { httpRequest } from './http-request';

export interface SearchMerchantResponse {
  success: boolean;
  message?: string;
}

export interface Merchant {
  displayName: string;
  merchantId: string;
  ecomId: string;
  additionalDetailsExpanded: boolean;
  orderManagement: boolean;
  paymentGateway: boolean;
  showPlan: boolean;
  performPayment: boolean;
  authorizationFormat: 'Short' | 'Extended';
  merchantName: string;
}

export interface AddMerchantResponse {
  success: boolean;
  message?: string;
}

const search = async (name: string) => {
  const { data } = await httpRequest.get<SearchMerchantResponse>('/merchants', {
    params: { name: name },
  });

  return data;
};

const add = async (merchant: Merchant) => {
  const body = {
    in_store_merchant_name: merchant.merchantName,
    merchant_id: merchant.merchantId,
    store_number: merchant.ecomId,
    order_management: merchant.orderManagement,
    payment_gateway_info: {
      enabled: merchant.paymentGateway,
      show_plan_selection: merchant.showPlan,
      perform_payment_authorization: merchant.performPayment,
      authorization_format: merchant.authorizationFormat,
    },
  };

  const { data } = await httpRequest.post<AddMerchantResponse>('/merchants', body);

  return data;
};

export const getMerchantUsers = (
  merchantHash: string,
  callback: (result: Array<MerchantUser> | Error) => any
) =>
  httpRequest({
    url: `/merchants/${merchantHash}/users`,
    method: `GET`,
  })
    .then((res) => {
      const users: Array<MerchantUser> = res?.data?.users ?? [];
      if (!res?.data?.users) console.error(res);
      return callback(users);
    })
    .catch((err) => {
      console.error(err);
      return callback(err);
    });

export const searchMerchant = search;
export const addMerchant = add;
