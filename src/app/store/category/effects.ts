import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AlbumService} from '../../services/apis/album.service';
import {categoriesInit, categoryInfoInit, setCategories, setCategoryInfo} from './actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Category} from '../../services/apis/types';
import {throwError} from 'rxjs';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private albumServe: AlbumService) {}

  initCategories$ = createEffect(() => this.actions$.pipe(
      ofType(categoriesInit),
      mergeMap(action => this.albumServe.categories()),
      map((categories: Category[]) => {
        return setCategories({ categories });
      }),
      catchError(error => throwError(error))
    )
  );

  initCategoryInfo$ = createEffect(() => this.actions$.pipe(
    ofType(categoryInfoInit),
    mergeMap(action => this.albumServe.detailCategoryPageInfo(action)
      .pipe(
        map(categoryInfo => {
          return setCategoryInfo(categoryInfo);
        }),
        catchError(error => throwError(error))
      ))
    )
  );
}
