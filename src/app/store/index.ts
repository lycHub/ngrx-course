import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {ContextStoreModule} from './context';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    ContextStoreModule
  ]
})
export class XmStoreModule { }
