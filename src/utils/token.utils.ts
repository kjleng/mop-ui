import { ROLES } from 'constants/auth';

export const IsAdminUser = (session: any): boolean =>
  session.idToken.payload['custom:RoleName']?.toLowerCase() === ROLES.ADMIN;

export const IsMerchantUser = (session: any): boolean =>
  session.idToken.payload['custom:RoleName']?.toLowerCase() === ROLES.MERCHANT;
