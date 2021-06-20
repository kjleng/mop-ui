import { httpRequest } from './http-request';

export interface MerchantUser {
  fullName: string;
  emailAddress: string;
  language: 'en' | 'fr';
}

export interface CreateMerchantUserError {
  fullName: string;
  emailAddress: string;
  language: string;
}

export interface AddMerchantUserResponse {
  success: boolean;
  message?: string;
  error?: CreateMerchantUserError;
}

const add = async (user: MerchantUser) => {
  const body = {
    fullName: user.fullName,
    emailAddress: user.emailAddress,
    language: user.language,
  };

  try {
    const { data } = await httpRequest.post<AddMerchantUserResponse>('/merchant/user', body);

    return data;
  } catch (error) {
    const response: AddMerchantUserResponse = {
      success: false,
      message: error?.data?.message ? error?.data.message : 'Error',
      error: {
        fullName: error?.data?.error?.fullName || '',
        emailAddress: error?.data?.error?.emailAddress || '',
        language: error?.data?.error?.language || '',
      },
    };

    return response;
  }
};

export const addUserMerchant = add;
