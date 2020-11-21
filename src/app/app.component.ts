import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AlbumService} from './services/apis/album.service';
import {AlbumInfo, Category, Track} from './services/apis/types';
import {CategoryService} from './services/business/category.service';
import {Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {WindowService} from './services/tools/window.service';
import {storageKeys} from './configs';
import {PlayerService} from './services/business/player.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {ContextStoreService} from './services/business/context.store.service';
import {RouterStoreModule} from './store/router';
import {select, Store} from '@ngrx/store';
import {selectCustomRouter} from './store/router/custom.reducer';

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
  currentCategory: Category;
  categories: Category[] = [];
  categoryPinyin = '';
  subCategory: string[] = [];
  showLogin = false;
  showPlayer = false;
  playerInfo: {
    trackList: Track[];
    currentIndex: number;
    currentTrack: Track;
    album: AlbumInfo;
    playing: boolean;
  };
  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private categoryServe: CategoryService,
    private router: Router,
    private winServe: WindowService,
    private contextStoreServe: ContextStoreService,
    private playerServe: PlayerService,
    readonly routerStore$: Store<RouterStoreModule>
  ) {
    const routerFeature = this.routerStore$.select(selectCustomRouter);
    routerFeature.subscribe(res => {
      console.log('selectRouter', res);
    });

    // this.routerStore$.select(selectUrl).subscribe(res => {
    //   console.log('selectUrl', res);
    // });

    // this.routerStore$.select(selectRouteParams).subscribe(res => {
    //   console.log('selectRouteParam', res);
    // });
  }

  ngOnInit(): void {
    if (this.winServe.getStorage(storageKeys.remember)) {
      this.contextStoreServe.userInfo();
    }
    this.init();
    this.watchPlayer();
  }
  private watchPlayer(): void {
    combineLatest(
      this.playerServe.getTracks(),
      this.playerServe.getCurrentIndex(),
      this.playerServe.getCurrentTrack(),
      this.playerServe.getAlbum(),
      this.playerServe.getPlaying()
    ).subscribe(([trackList, currentIndex, currentTrack, album, playing]) => {
      // console.log('trackList', trackList);
      this.playerInfo = {
        trackList,
        currentIndex,
        currentTrack,
        album,
        playing
      }
      if (trackList.length) {
        this.showPlayer = true;
        this.cdr.markForCheck();
      }
    });
  }

  changeCategory(category: Category): void {
    this.router.navigateByUrl('/albums/' + category.pinyin);
  }
  private init(): void {
    combineLatest(
      this.categoryServe.getCategory(),
      this.categoryServe.getSubCategory()
    ).subscribe(([category, subCategory]) => {
      // console.log('get category', category);
      if (category !== this.categoryPinyin) {
        this.categoryPinyin = category;
        if (this.categories.length) {
          this.setCurrentCategory();
        }
      }
      this.subCategory = subCategory;
    });
    this.getCategories();
  }

  private getCategories(): void {
    this.albumServe.categories().subscribe(categories => {
      this.categories = categories;
      this.setCurrentCategory();
      this.cdr.markForCheck();
    });
  }

  private setCurrentCategory(): void {
    this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin);
  }

  logout(): void {
    this.contextStoreServe.logout();
  }

  closePlayer(): void {
    this.playerServe.clear();
    this.showPlayer = false;
  }
}
