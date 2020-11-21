import { Action, createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';

export const categoryFeatureKey = 'category';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(CategoryActions.loadCategorys, state => state),
  on(CategoryActions.loadCategorysSuccess, (state, action) => state),
  on(CategoryActions.loadCategorysFailure, (state, action) => state),

);

