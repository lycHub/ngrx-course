import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCategory from './category.reducer';

export const selectCategoryState = createFeatureSelector<fromCategory.State>(
  fromCategory.categoryFeatureKey
);
