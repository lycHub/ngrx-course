import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {ContextStoreModule} from './context';
import {STORE_CONFIG} from './configs';
import {extModules} from '../../build-specifics';
import {BookStoreModule} from './book';
import {RouterStoreModule} from './router';
import {CategoryStoreModule} from './category';
import {AlbumStoreModule} from './album';
import {PlayerStoreModule} from './player';




@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}, STORE_CONFIG),
    EffectsModule.forRoot(),
    ContextStoreModule,
    CategoryStoreModule,
    AlbumStoreModule,
    PlayerStoreModule,
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
