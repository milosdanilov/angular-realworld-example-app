import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Errors, UserService } from '../core';

import { selectAuthErrors, selectAuthStatusInProgress } from './state/state';
import { AuthActions } from './state/actions';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: String = '';
  authForm: FormGroup;

  errors$: Observable<Errors>;
  isSubmitting$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private store: Store
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.errors$ = store.select(selectAuthErrors);
    this.isSubmitting$ = store.select(selectAuthStatusInProgress);
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }

      this.store.dispatch(AuthActions.enterPage());
      this.cd.markForCheck();
    });
  }

  submitForm() {
    const credentials = this.authForm.value;

    if (this.authType === 'login') {
      this.store.dispatch(AuthActions.signIn({ credentials }));
    } else {
      this.store.dispatch(AuthActions.singUp({ credentials }));
    }
  }
}
