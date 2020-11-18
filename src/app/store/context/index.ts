import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {contextFeatureKey, contextReducer} from './reducer';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(contextFeatureKey, contextReducer)
  ]
})
export class ContextStoreModule { }
