import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export const login = createAction(
    '[User] Login', 
    props<{ email:string, password:string }>()
);

export const loginSuccess = createAction(
    '[User] Login Success', 
    props<{ user: User }>()
);
export const loginFailure = createAction(
    '[User] Login Failure', 
    props<{ error: string }>()
);
export const logout = createAction(
    '[User] Logout'
);

export const logoutSuccess = createAction(
    '[User] Logout Success'
);

export const logoutFailure = createAction(
    '[User] Logout Failure',
    props<{ error: string }>()
);