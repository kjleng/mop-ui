import Roles from 'enums/roles.enum';
import { capitalize } from 'utils/string.utils';

// converts RoleName attribute in token to Roles enum value
export const GetUserRole = (session: any): Roles => {
  const role = session?.idToken.payload['custom:RoleName'];

  if (role) {
    return Roles[capitalize(role) as keyof typeof Roles] ?? Roles.Undefined;
  }

  return Roles.Undefined;
};

export const IsAdminUser = (session: any): boolean =>
  session != null && session.idToken.payload['custom:RoleName']?.toUpperCase() === Roles.Admin;

export const IsMerchantUser = (session: any): boolean =>
  session != null && session.idToken.payload['custom:RoleName']?.toUpperCase() === Roles.Merchant;
