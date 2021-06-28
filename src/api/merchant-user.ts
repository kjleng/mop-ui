import { httpRequest } from './http-request';

export interface MerchantUserDTO {
  fullName: string;
  emailAddress: string;
  language: string;
}

export interface AddMerchantUserResponse {
  success: boolean;
  message?: string;
  error?: any;
}

const add = async (users: Array<MerchantUserDTO>, merchantHash: string) => {
  try {
    const { data } = await httpRequest.post<AddMerchantUserResponse>(
      `/merchants/${merchantHash}/users`,
      { users }
    );

    return data;
  } catch (error) {
    const response: AddMerchantUserResponse = {
      success: false,
      message: error?.data?.message ? error?.data.message : 'Error',
      error: {
        error,
      },
    };

    return response;
  }
};

export const addUserMerchant = add;
