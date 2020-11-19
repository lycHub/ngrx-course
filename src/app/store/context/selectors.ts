import {contextFeatureKey, ContextState} from './reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const selectContextFeature = createFeatureSelector<ContextState>(contextFeatureKey);

const selectContextState = (state: ContextState) => state;

export const getUser = createSelector(selectContextState, (state: ContextState) => state.user);
