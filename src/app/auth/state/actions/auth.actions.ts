import { createAction, props } from '@ngrx/store';

import { LoginUser, NewUser } from '../../../core/models/auth.model';

export const enterPage = createAction('[Auth Page] Enter');

export const signIn = createAction(
  '[Auth Page] Sign in',
  props<{ credentials: LoginUser }>()
);

export const singUp = createAction(
  '[Auth Page] Sign up',
  props<{ credentials: NewUser }>()
);



