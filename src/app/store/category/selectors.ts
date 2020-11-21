import { createFeatureSelector, createSelector } from '@ngrx/store';
import {Category} from '../../services/apis/types';
import {CategoryFeatureKey, CategoryState} from './reducer';

export const selectCategoryFeature = createFeatureSelector<CategoryState>(CategoryFeatureKey);

const selectCategoryStates = (state: CategoryState) => state;

export const getCategories = createSelector(selectCategoryStates, (state: CategoryState) => state.categories);
export const getCategoryInfo = createSelector(selectCategoryStates, (state: CategoryState) => state.categoryInfo);


export const getCategory = createSelector(selectCategoryStates, (state: CategoryState) => state.category);
export const getSubCategory = createSelector(selectCategoryStates, (state: CategoryState) => state.subcategory);


export const getCurrentCategory = createSelector(
  getCategories,
  getCategory,
  (categories: Category[], categoryPinyin: string) => {
    return categories.find(item => item.pinyin === categoryPinyin);
  }
);
