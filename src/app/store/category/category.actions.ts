import { createAction, props } from '@ngrx/store';

export const loadCategorys = createAction(
  '[Category] Load Categorys'
);

export const loadCategorysSuccess = createAction(
  '[Category] Load Categorys Success',
  props<{ data: any }>()
);

export const loadCategorysFailure = createAction(
  '[Category] Load Categorys Failure',
  props<{ error: any }>()
);
