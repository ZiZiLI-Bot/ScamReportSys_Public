import { AuthActionType, PayloadAction, TAuthState } from "./auth.context";
import { deleteCookie } from "cookies-next";

export type ReducerHandler = {
  INITIALIZE(state: TAuthState, action: PayloadAction<TAuthState>): TAuthState;
  SIGN_IN(state: TAuthState, action: PayloadAction<TAuthState>): TAuthState;
  SIGN_OUT(state: TAuthState): TAuthState;
};

const reducerHandler: ReducerHandler = {
  INITIALIZE(state, action): TAuthState {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialize: false,
      user,
    };
  },
  SIGN_IN(state, action): TAuthState {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isInitialize: false,
      user,
    };
  },
  SIGN_OUT(state): TAuthState {
    return {
      ...state,
      isAuthenticated: false,
      isInitialize: false,
      user: null,
    };
  },
};

export function authReducer(state: TAuthState, action: PayloadAction<TAuthState>) {
  if (!reducerHandler[action.type]) return state;
  return reducerHandler[action.type](state, action);
}

export function initialize(payload: TAuthState): PayloadAction<TAuthState> {
  return {
    type: AuthActionType.INITIALIZE,
    payload,
  };
}

export function signIn(payload: TAuthState): PayloadAction<TAuthState> {
  return {
    type: AuthActionType.SIGN_IN,
    payload,
  };
}

export function signOut(): PayloadAction<TAuthState> {
  deleteCookie("token");
  return {
    type: AuthActionType.SIGN_OUT,
    payload: { user: null, isAuthenticated: false },
  };
}
