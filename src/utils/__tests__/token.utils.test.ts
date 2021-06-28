import Roles from 'enums/roles.enum';
import { GetUserRole, IsAdminUser, IsMerchantUser } from 'utils/token.utils';

const session = {
  idToken: {
    payload: {
      'custom:RoleName': 'BLAH',
    },
  },
};

describe('token.utils', () => {
  describe('GetUserRole()', () => {
    it('should return Roles.Admin enum value if role is Admin', () => {
      session.idToken.payload['custom:RoleName'] = 'admin';
      expect(GetUserRole(session)).toBe(Roles.Admin);
    });

    it('should return Roles.Merchant enum value if role is Merchant', () => {
      session.idToken.payload['custom:RoleName'] = 'merchant';
      expect(GetUserRole(session)).toBe(Roles.Merchant);
    });

    it('should return Roles.Undefined enum value if role is unknown or session is null', () => {
      session.idToken.payload['custom:RoleName'] = 'bloop';
      expect(GetUserRole(session)).toBe(Roles.Undefined);
      expect(GetUserRole(null)).toBe(Roles.Undefined);
    });
  });

  describe('IsAdminUser()', () => {
    it('should return false if user session is null', () => {
      expect(IsAdminUser(null)).toBeFalsy();
    });

    it('should return false if role is not Admin', () => {
      session.idToken.payload['custom:RoleName'] = 'not admin';
      expect(IsAdminUser(session)).toBeFalsy();
    });

    it('should return true if role is Admin', () => {
      session.idToken.payload['custom:RoleName'] = 'admin';
      expect(IsAdminUser(session)).toBeTruthy();
    });
  });

  describe('IsMerchantUser()', () => {
    it('should return false if user session is null', () => {
      expect(IsMerchantUser(null)).toBeFalsy();
    });

    it('should return false if role is not Merchant', () => {
      session.idToken.payload['custom:RoleName'] = 'not merchant';
      expect(IsMerchantUser(session)).toBeFalsy();
    });

    it('should return true if role is Merchant', () => {
      session.idToken.payload['custom:RoleName'] = 'Merchant';
      expect(IsMerchantUser(session)).toBeTruthy();
    });
  });
});
