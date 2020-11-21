import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {BookFeatureKey, bookReducer} from './reducer';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(BookFeatureKey, bookReducer)
  ]
})
export class BookStoreModule { }
