import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreeterService {
  private suffixSub = new BehaviorSubject('@');
  suffix$ = this.suffixSub.asObservable();

  constructor() {}
  setSuffix(value: string): void {
    this.suffixSub.next(value);
  }
}
