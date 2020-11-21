import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ContextStoreModule} from './context';
import {metaReducers} from './configs';




@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, {
      metaReducers
    }),
    EffectsModule.forRoot(),
    ContextStoreModule
  ]
})
export class XmStoreModule { }
