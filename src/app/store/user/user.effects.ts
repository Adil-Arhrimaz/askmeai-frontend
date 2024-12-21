import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, logoutFailure } from './user.actions';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
    
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
        ofType(login), 
        mergeMap((action) =>
            this.userService.login(action.email, action.password).then(
              (user) => {
                this.router.navigate(['/chat']);
                return loginSuccess({ user });
              },
                (error) => loginFailure({ error }) 
            )
        )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
          ofType(logout),
          mergeMap(() =>
            this.userService.logout().then(
              () => logoutSuccess(),
              (error) => logoutFailure({ error: error.message || 'Logout failed. Please try again.' }) 
            )
          )
        )
      );
}
