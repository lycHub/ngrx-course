import { Injectable } from '@angular/core';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {EMPTY, throwError} from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {getUserInfo, login, loginSuccess, logout, setUser} from './action';
import {UserService} from '../../services/apis/user.service';
import {storageKeys} from '../../configs';
import {WindowService} from '../../services/tools/window.service';
import {MessageService} from '../../share/components/message/message.service';

@Injectable()
export class UserEffects {
  constructor(
    private messageServe: MessageService,
    private actions$: Actions,
    private userServe: UserService,
    private winServe: WindowService) {}
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap(payload => this.userServe.login(payload)),
    map(res => loginSuccess(res)),
    catchError(() => EMPTY)
  ));


  info$ = createEffect(() => this.actions$.pipe(
    ofType(getUserInfo),
    mergeMap(() => this.userServe.userInfo()),
    map(res => loginSuccess(res)),
    tap(res => {
      this.winServe.setStorage(storageKeys.auth, res.token);
    }),
    catchError(error => {
      this.clearStorage();
      return throwError(error);
    })
  ));


  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    mergeMap(() => this.userServe.logout()),
    map(() => setUser(null)),
    tap(res => {
      this.clearStorage();
      this.messageServe.success('退出成功');
    }),
    catchError(error => throwError(error))
  ));


  private clearStorage(): void {
    this.winServe.removeStorage(storageKeys.remember);
    this.winServe.removeStorage(storageKeys.auth);
  }
}
