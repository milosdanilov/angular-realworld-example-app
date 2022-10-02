import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

/**
 * Feature Selector
 */
export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

/**
 * Auth Selectors
 */
export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectAuthErrors = createSelector(
  selectAuthState,
  (state) => state.errors
);

export const selectAuthStatusInProgress = createSelector(
  selectAuthState,
  (state) => state.status === fromAuth.Status.IN_PROGRESS
);
