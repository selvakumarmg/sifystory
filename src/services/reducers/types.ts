// types.ts

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

export interface LoginAction {
  type: 'LOGIN';
  payload: {
    user: User;
    token: string;
  };
}

export interface LogoutAction {
  type: 'LOGOUT';
}

export interface LoginErrorAction {
  type: 'LOGIN_ERROR';
  payload: string;
}

export type AuthActionTypes = LoginAction | LogoutAction | LoginErrorAction;
