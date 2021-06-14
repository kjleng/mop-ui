import { httpRequest } from "./http-request";

export interface SearchMerchantResponse {
  success: boolean;
  message?: string;
}

export interface Merchant {
    displayName: String;
    merchantId: String;
    ecomId: String;
    additionalDetailsExpanded: boolean;
    orderManagement: boolean;
    paymentGateway: boolean;
    showPlan: boolean;
    performPayment: boolean;
    authorizationFormat: 'Short' | 'Extended';
    merchantName: String
}

export interface AddMerchantResponse {
    success: boolean;
    message?: string;
  }
  
const search = async (name: String) => {
  const { data } = await httpRequest.get<SearchMerchantResponse>("/merchants", {
    params: { name: name },
  });

  return data;
};

const add = async (merchant: Merchant) => {

    const body = {
        "in_store_merchant_name": merchant.merchantName,
        "merchant_id": merchant.merchantId,
        "store_number": merchant.ecomId,
        "order_management": merchant.orderManagement,
        "payment_gateway_info": {
            "enabled": merchant.paymentGateway,
            "show_plan_selection": merchant.showPlan,
            "perform_payment_authorization": merchant.performPayment,
            "authorization_format": merchant.authorizationFormat
        }
    }
 
    const { data } = await httpRequest.post<AddMerchantResponse>('/merchants', body);

    return data;
    
   };

export const searchMerchant = search;
export const addMerchant = add;
