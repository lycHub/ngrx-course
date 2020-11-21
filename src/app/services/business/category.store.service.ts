import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {WindowService} from '../tools/window.service';
import {storageKeys} from '../../configs';
import {CategoryState} from '../../store/category/reducer';
import {CategoryStoreModule} from '../../store/category';
import {select, Store} from '@ngrx/store';
import {
  getCategories,
  getCategory,
  getCategoryInfo,
  getCurrentCategory,
  getSubCategory,
  selectCategoryFeature
} from '../../store/category/selectors';
import {categoriesInit, categoryInfoInit, setCategory, setSubCategory} from '../../store/category/actions';
import {AlbumArgs, CategoryInfo} from '../apis/album.service';
import {Category} from '../apis/types';

@Injectable({
  providedIn: 'root'
})
export class CategoryStoreService {
  readonly category$: Observable<CategoryState>;
  constructor(private winServe: WindowService, readonly store$: Store<CategoryStoreModule>) {
    const cacheCategory = this.winServe.getStorage(storageKeys.categoryPinyin);
    if (cacheCategory) {
      this.setCategory(cacheCategory);
    }
    this.category$ = this.store$.select(selectCategoryFeature);
  }

  initCategories(): void {
    this.store$.dispatch(categoriesInit());
  }

  initCategoryInfo(args: AlbumArgs): void {
    this.store$.dispatch(categoryInfoInit(args));
  }

  getCategories(): Observable<Category[]> {
    return this.category$.pipe(select(getCategories));
  }

  getCurrentCategory(): Observable<Category> {
    return this.category$.pipe(select(getCurrentCategory));
  }

  getCategoryInfo(): Observable<CategoryInfo> {
    return this.category$.pipe(select(getCategoryInfo));
  }

  setCategory(category: string): void {
    this.winServe.setStorage(storageKeys.categoryPinyin, category);
    this.store$.dispatch(setCategory({ category }));
  }

  getCategory(): Observable<string> {
    return this.category$.pipe(select(getCategory));
  }

  setSubCategory(category: string[]): void {
    this.store$.dispatch(setSubCategory({ category }));
  }

  getSubCategory(): Observable<string[]> {
    return this.category$.pipe(select(getSubCategory));
  }
}
