import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {META_REDUCERS, StoreModule} from '@ngrx/store';
import {ContextStoreModule} from './context';
import {metaReducerFactory} from './configs';




@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    ContextStoreModule
  ],
  providers: [
    {
      provide: META_REDUCERS,
      useFactory: metaReducerFactory,
      multi: true,
    },
  ]
})
export class XmStoreModule { }
