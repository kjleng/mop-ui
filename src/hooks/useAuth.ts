import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { STORAGE_KEYS } from 'constants/auth';
import { AuthContext } from 'contexts/AuthContext';
import { useContext, useState } from 'react';
import { config } from 'utils/config';

export type LoginCredentials = {
  Username: string;
  Password: string;
};

const poolData = {
  UserPoolId: config().USER_POOL_ID,
  ClientId: config().CLIENT_ID,
};
const userPool = new CognitoUserPool(poolData);

// promisified cognito methods to enable async/await pattern
const asyncAuthenticateUser = (
  cognitoUser: CognitoUser,
  cognitoAuthenticationDetails: AuthenticationDetails
) =>
  new Promise<CognitoUserSession>((resolve, reject) => {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
      newPasswordRequired: resolve,
    });
  });

const asyncSignOut = (cognitoUser: CognitoUser) =>
  new Promise<void>(() => {
    cognitoUser.signOut();
  });

export const useAuth = () => useContext(AuthContext);

// Provider hook that creates auth object and handles state
export const useProvideAuth = () => {
  const [user, setUser] = useState<CognitoUser>();
  const [userSession, setUserSession] = useState<CognitoUserSession>();

  const signIn = async (credentials: LoginCredentials) => {
    const userData = {
      Username: credentials.Username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    const authDetails = new AuthenticationDetails(credentials);

    const session = await asyncAuthenticateUser(cognitoUser, authDetails);

    if (session.isValid()) {
      setUser(cognitoUser);
      setUserSession(session);

      if (sessionStorage) {
        sessionStorage.setItem(STORAGE_KEYS.USER_SESSION, JSON.stringify(session));
        sessionStorage.setItem(
          STORAGE_KEYS.EXPIRES_ON,
          JSON.stringify(session.getIdToken().getExpiration())
        );
      }

      return true;
    }

    return false;
  };

  const signOut = async () => {
    if (user) {
      await asyncSignOut(user);
    }

    if (sessionStorage) {
      sessionStorage.removeItem(STORAGE_KEYS.USER_SESSION);
      sessionStorage.removeItem(STORAGE_KEYS.EXPIRES_ON);
    }
  };

  const isAuthenticated = () => {
    const val = sessionStorage.getItem(STORAGE_KEYS.EXPIRES_ON);
    const expiresOn = val && JSON.parse(val);
    const isLoggedIn = expiresOn ? new Date().getTime() / 1000 < expiresOn : false;

    if (!isLoggedIn) {
      signOut();
      return false;
    }

    return isLoggedIn;
  };

  const getUserSession = (): CognitoUserSession | null => {
    if (!isAuthenticated()) return null;
    if (userSession) return userSession;

    const val = sessionStorage.getItem(STORAGE_KEYS.USER_SESSION);
    const session = val && JSON.parse(val);

    if (!session) {
      signOut();
      return null;
    }

    return session;
  };

  // Return the user object and auth methods
  return {
    user,
    userSession,
    signIn,
    signOut,
    isAuthenticated,
    getUserSession,
  };
};
