export type Merchant = {
  name: string;
  code: number;
  date: string;
  status: string;
  users?: Array<any>;
};

export type MerchantUser = {
  sub: string;
  email: string;
  email_verified: 'true' | 'false';
  name: string;
  username: string;
};
