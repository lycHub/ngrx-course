import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Category, Track} from './services/apis/types';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {WindowService} from './services/tools/window.service';
import {storageKeys} from './configs';
import {animate, style, transition, trigger} from '@angular/animations';
import {ContextStoreService} from './services/business/context.store.service';
import {CategoryStoreService} from './services/business/category.store.service';
import {PlayerStoreService} from './services/business/player.store.service';

@Component({
  selector: 'xm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadePlayer', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  currentCategory$: Observable<Category>;
  categories$: Observable<Category[]>;
  subCategory$: Observable<string[]>;
  categoryPinyin = '';
  showLogin = false;
  trackList$: Observable<Track[]>;
  constructor(
    private router: Router,
    private winServe: WindowService,
    private contextStoreServe: ContextStoreService,
    private categoryStoreServe: CategoryStoreService,
    private playerStoreServe: PlayerStoreService,
  ) {}

  ngOnInit(): void {
    if (this.winServe.getStorage(storageKeys.remember)) {
      this.contextStoreServe.userInfo();
    }
    this.init();
    this.trackList$ = this.playerStoreServe.getTracks();
  }

  changeCategory(category: Category): void {
    this.router.navigateByUrl('/albums/' + category.pinyin);
  }
  private init(): void {
    this.categoryStoreServe.initCategories();
    this.categories$ = this.categoryStoreServe.getCategories();
    this.subCategory$ = this.categoryStoreServe.getSubCategory();
    this.currentCategory$ = this.categoryStoreServe.getCurrentCategory();
  }

  logout(): void {
    this.contextStoreServe.logout();
  }

  closePlayer(): void {
    this.playerStoreServe.clear();
  }
}
