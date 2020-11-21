import {InjectionToken, NgModule} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {Action, ActionReducerMap, StoreModule} from '@ngrx/store';
import {contextFeatureKey, contextReducer, ContextState} from './reducer';
import {UserEffects} from './user.effects';


export const CONTEXT_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<ContextState>>('Context Reducers');

export function getReducers(): (state: ContextState, action: Action) => ContextState {
  return contextReducer;
}




@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(contextFeatureKey, CONTEXT_REDUCER_TOKEN),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    {
      provide: CONTEXT_REDUCER_TOKEN,
      useFactory: getReducers
    }
  ]
})
export class ContextStoreModule { }
