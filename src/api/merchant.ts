import { httpRequest } from './http-request';

export interface SearchMerchantResponse {
    success: boolean;
    message?: string;
}
const search = async (name: String) => {
 
    const { data } = await httpRequest.get<SearchMerchantResponse>('/merchants', { params: { name: name }});

    return data;
    
   };

export const searchMerchant = search;