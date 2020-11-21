import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ContextStoreModule} from './context';
import {STORE_CONFIG} from './configs';
import {extModules} from '../../build-specifics';
import {BookStoreModule} from './book';
import {RouterStoreModule} from './router';
import {CategoryStoreModule} from './category';




@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, STORE_CONFIG),
    EffectsModule.forRoot(),
    ContextStoreModule,
    CategoryStoreModule,
    BookStoreModule,
    RouterStoreModule,
    extModules
  ]
  // providers: [
  //   {
  //     provide: META_REDUCERS,
  //     useFactory: metaReducerFactory,
  //     multi: true,
  //   },
  // ]
})
export class XmStoreModule { }
