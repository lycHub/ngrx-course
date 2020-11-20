import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../apis/types';
import {select, Store} from '@ngrx/store';
import {ContextStoreModule} from '../../store/context';
import {ContextState} from '../../store/context/reducer';
import {getUser, selectContextFeature} from '../../store/context/selectors';
import {getUserInfo, login, logout, setUser} from 'src/app/store/context/action';

@Injectable({
  providedIn: 'root'
})
export class ContextStoreService {
  readonly context$: Observable<ContextState>;
  constructor(private store$: Store<ContextStoreModule>) {
    this.context$ = this.store$.select(selectContextFeature);
  }

  login(params: Exclude<User, 'name'>): void {
    this.store$.dispatch(login(params));
  }

  userInfo(): void {
    this.store$.dispatch(getUserInfo());
  }

  logout(): void {
    this.store$.dispatch(logout());
  }

  setUser(user: User): void {
    this.store$.dispatch(setUser(user));
  }

  getUser(): Observable<User> {
    return this.context$.pipe(select(getUser));
  }
}
