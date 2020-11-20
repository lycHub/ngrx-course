import {createAction, props} from '@ngrx/store';
import {User} from '../../services/apis/types';
import {LoginRes} from '../../services/apis/user.service';

export const login = createAction(
  '[Context] Login',
  props<Exclude<User, 'name'>>()
);


export const loginSuccess = createAction(
  '[Context] Login success',
  props<LoginRes>()
);

export const logoutSuccess = createAction(
  '[Context] Logout success'
);

export const logout = createAction('[Context] Logout');


export const setUser = createAction('[Context] Set user', props<User>());

export const getUserInfo = createAction('[Context] Get user info');

