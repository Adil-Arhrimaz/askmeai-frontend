import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.models';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state) => state.user);

export const selectUserId = createSelector(selectUser, (user) => user?.id || null);

export const selectUserEmail = createSelector(selectUser, (user) => user?.email || null);

export const selectStatus = createSelector(selectUserState, (state) => state.status);

export const selectError = createSelector(selectUserState, (state) => state.error);