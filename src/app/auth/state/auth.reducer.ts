import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from './actions';
import { Errors, User } from '../../core';

export enum Status {
  INIT = 'INIT',
  IN_PROGRESS = 'IN_PROGRESS',
}

export interface State {
  status: Status;
  user: User | null;
  errors: Errors;
}

export const noErrors = { errors: {} };

export const initialState: State = {
  status: Status.INIT,
  user: null,
  errors: noErrors
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.enterPage, (state) => {
    return {
      ...state,
      status: Status.INIT,
      errors: noErrors
    }
  }),
  on(AuthActions.singUp, AuthActions.signIn, (state) => {
    return {
      ...state,
      status: Status.IN_PROGRESS,
      errors: noErrors
    }
  }),
  on(AuthApiActions.userSignedUpSuccess, AuthApiActions.userSignedInSuccess, (state, action) => {
    return {
      ...state,
      status: Status.INIT,
      user: action.user
    }
  }),
  on(AuthApiActions.userSignedUpError, AuthApiActions.userSignedInError, (state, action) => {
    return {
      ...state,
      status: Status.INIT,
      errors: action.errors
    }
  })
);

export const selectUser = (state: State) => state.user;
export const selectErrors = (state: State) => state.errors;
export const selectStatusInProgress = (state: State) => state.status === Status.IN_PROGRESS;
