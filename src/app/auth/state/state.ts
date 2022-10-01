import { NgModule } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  StoreModule
} from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export const FEATURE_KEY = 'auth-feature';

/**
 * State Shape
 */
export interface State {
  auth: fromAuth.State,
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};


export const metaReducers: MetaReducer<State>[] = [];

/**
 * Module
 */
@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, reducers, { metaReducers })]
})
export class StateAuthModule {}

/**
 * Feature Selector
 */
export const selectFeatureAuthState = createFeatureSelector<State>(FEATURE_KEY);

/**
 * Auth Selectors
 */
export const selectAuthState = createSelector(
  selectFeatureAuthState,
  (authState) => authState.auth
);

export const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser
);

export const selectAuthErrors = createSelector(
  selectAuthState,
  fromAuth.selectErrors
);

export const selectAuthStatusInProgress = createSelector(
  selectAuthState,
  fromAuth.selectStatusInProgress
)
