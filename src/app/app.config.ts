import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CookieService } from 'ngx-cookie-service';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromUser from './store/user';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    CookieService,
    provideStore({
      user: fromUser.userReducer,
    }),
    provideEffects([
      fromUser.UserEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }), provideAnimationsAsync(),
  ]
};
