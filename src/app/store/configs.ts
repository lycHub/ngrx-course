import {ActionReducer, MetaReducer} from '@ngrx/store';


export function metaReducerFactory(): MetaReducer<any> {
  return debug;
}

function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];
