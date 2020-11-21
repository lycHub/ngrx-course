import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AlbumFeatureKey, albumReducer} from "./reducer";
import {EffectsModule} from "@ngrx/effects";
import {AlbumEffects} from "./effects";

@NgModule({
  imports: [
    StoreModule.forFeature(AlbumFeatureKey, albumReducer),
    EffectsModule.forFeature([AlbumEffects])
  ]
})
export class AlbumStoreModule {}
