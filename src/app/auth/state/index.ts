import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

/**
 * Module
 */
@NgModule({
  imports: [StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer)]
})
export class StateAuthModule {}
