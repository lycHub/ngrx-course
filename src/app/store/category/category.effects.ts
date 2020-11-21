import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as CategoryActions from './category.actions';



@Injectable()
export class CategoryEffects {

  loadCategorys$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CategoryActions.loadCategorys),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CategoryActions.loadCategorysSuccess({ data })),
          catchError(error => of(CategoryActions.loadCategorysFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
