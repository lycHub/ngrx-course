import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {CategoryFeatureKey, categoryReducer} from './reducer';
import {EffectsModule} from "@ngrx/effects";
import {CategoryEffects} from "./effects";

@NgModule({
  imports: [
    StoreModule.forFeature(CategoryFeatureKey, categoryReducer),
    EffectsModule.forFeature([CategoryEffects])
  ]
})
export class CategoryStoreModule {}
