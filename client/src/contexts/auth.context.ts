import { Dispatch, createContext } from "react";

export type TAuthUser = {
  _id?: string;
  email?: string;
  role?: string;
  name?: string;
  user_id?: string;
};

export type TAuthState = {
  isAuthenticated?: boolean;
  isInitialize?: boolean;
  user: TAuthUser | null;
};

export enum AuthActionType {
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export type PayloadAction<T> = {
  type: AuthActionType;
  payload: T;
};

export interface AuthContextType extends TAuthState {
  dispatch: Dispatch<PayloadAction<TAuthState>>;
}

export const initialState: TAuthState = {
  isAuthenticated: false,
  isInitialize: true,
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});
