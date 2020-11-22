import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {playerReducer, PlayersFeatureKey} from "./reducer";
import {EffectsModule} from "@ngrx/effects";
import {PlayerEffects} from "./effects";

@NgModule({
  imports: [
    StoreModule.forFeature(PlayersFeatureKey, playerReducer),
    EffectsModule.forFeature([PlayerEffects])
  ]
})
export class PlayerStoreModule {}
