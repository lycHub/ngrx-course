import {getSelectors, routerReducer, RouterReducerState } from '@ngrx/router-store';
import {createFeatureSelector, ActionReducerMap} from '@ngrx/store';
import {RouterStateUrl} from './custom-route-serializer';

export const CustomRouterFeatureKey = 'customRouter';

export interface CustomRouterState {
  [CustomRouterFeatureKey]: RouterReducerState<RouterStateUrl>;
}

export const customRouterReducer: ActionReducerMap<CustomRouterState> = {
  [CustomRouterFeatureKey]: routerReducer
}

export const selectCustomRouter = createFeatureSelector<CustomRouterState, RouterReducerState<RouterStateUrl>>(CustomRouterFeatureKey);

export const {
  selectCurrentRoute,   // select the current route
  selectFragment,       // select the current route fragment
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = getSelectors(selectCustomRouter);
