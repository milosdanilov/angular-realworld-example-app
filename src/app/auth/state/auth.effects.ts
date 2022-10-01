import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { Errors, UserService } from '../../core';

import { AuthActions, AuthApiActions } from './actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.singUp),
      exhaustMap(({ credentials }) => {
        return this.userService
          .attemptAuth('sign-up', credentials)
          .pipe(
            map(user => AuthApiActions.userSignedUpSuccess({ user })),
            tap(() => this.router.navigateByUrl('/')),
            catchError((errors: Errors) => of(AuthApiActions.userSignedUpError({ errors })))
          )
      })
    )
  });

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap(({ credentials }) => {
        return this.userService
          .attemptAuth('login', credentials)
          .pipe(
            map(user => AuthApiActions.userSignedInSuccess({ user })),
            tap(() => this.router.navigateByUrl('/')),
            catchError((errors: Errors) => of(AuthApiActions.userSignedInError({ errors })))
          )
      })
    )
  });

}
