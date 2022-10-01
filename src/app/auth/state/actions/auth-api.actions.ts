import { createAction, props } from "@ngrx/store"
import { Errors, User } from "../../../core";

export const userSignedUpSuccess = createAction(
  '[Auth API] Sign Up Success',
  props<{ user: User }>()
);

export const userSignedUpError = createAction(
  '[Auth API] Sign Up Failure',
  props<{ errors: Errors }>()
);

export const userSignedInSuccess = createAction(
  '[Auth API] Sign In Success',
  props<{ user: User }>()
);

export const userSignedInError = createAction(
  '[Auth API] Sign In Failure',
  props<{ errors: Errors }>()
);
