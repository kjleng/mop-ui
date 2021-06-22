import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { ROLES } from 'constants/auth';

export const IsAdminUser = (session: CognitoUserSession): boolean =>
  session.getIdToken().payload['custom:RoleName']?.toLowerCase() === ROLES.ADMIN;

export const IsMerchantUser = (session: CognitoUserSession): boolean =>
  session.getIdToken().payload['custom:RoleName']?.toLowerCase() === ROLES.MERCHANT;
