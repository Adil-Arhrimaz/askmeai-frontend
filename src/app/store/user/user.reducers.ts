import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, logoutFailure } from './user.actions';
import { UserState } from './user.models';

export const initialUserState: UserState = {
  user: null,
  status: 'idle',
  error: null,
}

export const userReducer = createReducer(
  initialUserState,
  on(login, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'success' as const,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    status: 'error' as const,
    error,
  })),
  on(logout, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),
  on(logoutSuccess, () => initialUserState),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    user: null,
    status: 'error' as const,
    error,
  })),
);
