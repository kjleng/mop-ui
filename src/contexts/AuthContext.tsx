import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { LoginCredentials, useProvideAuth } from 'hooks/useAuth';
import React, { createContext } from 'react';

export interface AuthContext {
  user?: CognitoUser;
  userSession?: CognitoUserSession;
  signIn: (credentials: LoginCredentials) => Promise<boolean>;
  signOut: () => Promise<void>;
  isAuthenticated: () => boolean;
  getUserSession: () => CognitoUserSession | null;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export function AuthProvider({ children }: any) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
