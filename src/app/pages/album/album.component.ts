import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlbumTrackArgs} from '../../services/apis/album.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {AlbumInfo, Anchor, RelateAlbum, Track} from '../../services/apis/types';
import {IconType} from '../../share/directives/icon/type';
import {first, skip, takeUntil} from 'rxjs/operators';
import {PlayerService} from '../../services/business/player.service';
import {MessageService} from '../../share/components/message/message.service';
import {PageService} from '../../services/tools/page.service';
import {CategoryStoreService} from '../../services/business/category.store.service';
import {AlbumStoreService} from '../../services/business/album.store.service';

interface MoreState {
  full: boolean;
  label: string;
  icon: IconType;
}
@Component({
  selector: 'xm-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent implements OnInit, OnDestroy {
  albumInfo: AlbumInfo;
  score$: Observable<number>;
  anchor: Anchor;
  relateAlbums$: Observable<RelateAlbum[]>;
  tracks: Track[] = [];
  selectedTracks: Track[] = [];
  total = 0;
  trackParams: AlbumTrackArgs = {
    albumId: '',
    sort: 1,
    pageNum: 1,
    pageSize: 30
  };
  moreState: MoreState = {
    full: false,
    label: '显示全部',
    icon: 'arrow-down-line'
  }
  articleHeight: number;
  private playing = false;
  private currentTrack: Track;
  private destory$ = new Subject<void>();
  @ViewChild('msgTpl') private msgTpl: TemplateRef<void>;
  constructor(
    private route: ActivatedRoute,
    private categoryStoreServe: CategoryStoreService,
    private cdr: ChangeDetectorRef,
    private playerServe: PlayerService,
    private messageServe: MessageService,
    private pageServe: PageService,
    private albumStoreServe: AlbumStoreService
  ) { }

  playAll(): void {
    this.playerServe.setTracks(this.tracks);
    this.playerServe.setCurrentIndex(0);
    this.playerServe.setAlbum(this.albumInfo);
  }

  toggleTrack(track: Track, act: 'play' | 'pause'): void {
    if (act === 'pause') {
      this.playerServe.setPlaying(false);
    } else {
      this.setAlbumInfo();
      this.playerServe.playTrack(track);
    }
  }

  play(needPlay): void {
    if (this.selectedTracks.length) {
      if (needPlay) {
        this.playerServe.playTracks(this.selectedTracks);
      } else {
        this.playerServe.addTracks(this.selectedTracks);
        this.messageServe.info('已添加');
      }
      this.setAlbumInfo();
      this.checkAllChange(false);
    } else {
      this.messageServe.warning('未选中任何曲目');
    }
  }

  private setAlbumInfo(): void {
    if (!this.currentTrack) {
      this.playerServe.setAlbum(this.albumInfo);
    }
  }

  itemCls(id: number): string {
    // console.log('currentTrack', this.currentTrack);
    let result = 'item-name ';
    if (this.currentTrack) {
      if (this.playing) {
        if (this.currentTrack.trackId === id) {
          result += 'item-name-playing';
        }
      } else {
        if (this.currentTrack.trackId === id) {
          result += 'item-name-pause';
        }
      }
    }
    return result;
  }

  toggleMore(): void {
    this.moreState.full = !this.moreState.full;
    if (this.moreState.full) {
      this.moreState.label = '收起';
      this.moreState.icon = 'arrow-up-line';
    } else {
      this.moreState.label = '显示全部';
      this.moreState.icon = 'arrow-down-line';
    }
  }
  checkedChange(checked: boolean, track: Track): void {
    const targetIndex = this.selectedIndex(track.trackId);
    if (checked) {
      if (targetIndex === -1) {
        this.selectedTracks.push(track);
      }
    } else {
      if (targetIndex > -1) {
        this.selectedTracks.splice(targetIndex, 1);
      }
    }
    // console.log('selectedTracks', this.selectedTracks);
  }
  isChecked(id: number): boolean {
    return this.selectedIndex(id) > -1;
  }

  checkAllChange(checked): void {
    this.tracks.forEach(item => {
      const targetIndex = this.selectedIndex(item.trackId);
      if (checked) {
        if (targetIndex === -1) {
          this.selectedTracks.push(item);
        }
      } else {
        if (targetIndex > -1) {
          this.selectedTracks.splice(targetIndex, 1);
        }
      }
    });
  }

  isCheckedAll(): boolean {
    if (this.selectedTracks.length >= this.tracks.length) {
      return this.tracks.every(item => {
        return this.selectedIndex(item.trackId) > -1;
      });
    }
    return false;
  }

  private selectedIndex(id: number): number {
    return this.selectedTracks.findIndex(item => item.trackId === id);
  }
  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destory$)).subscribe(paramMap => {
      this.trackParams.albumId = paramMap.get('albumId');
      this.trackParams.pageNum = 1;
      this.initPageData();
      this.updateTracks();
      this.watchTracksInfo();
      this.watchPlayer();
    });
  }
  private watchPlayer(): void {
    combineLatest(
      this.playerServe.getCurrentTrack(),
      this.playerServe.getPlaying()
    ).pipe(takeUntil(this.destory$)).subscribe(([track, playing]) => {
      this.currentTrack = track;
      this.playing = playing;
      this.cdr.markForCheck();
    });
  }
  changePage(page: number): void {
    if (this.trackParams.pageNum !== page) {
      this.trackParams.pageNum = page;
      this.updateTracks();
    }
  }
  updateTracks(): void {
    this.albumStoreServe.requestTracksInfo(this.trackParams);
  }
  watchTracksInfo(): void {
    this.albumStoreServe.getTracksInfo().pipe(skip(1), takeUntil(this.destory$)).subscribe(res => {
      this.tracks = res.tracks;
      this.total = res.trackTotalCount;
      this.cdr.markForCheck();
    });
  }
  private initPageData(): void {
    this.albumStoreServe.requestAlbum(this.trackParams.albumId);
    this.albumStoreServe.getAlbumInfo().pipe(skip(1), first()).subscribe(albumInfo => {
      // console.log('albumInfo', albumInfo);
      this.albumInfo = albumInfo;
      this.anchor = albumInfo.anchorInfo;
      this.categoryStoreServe.getCategory().pipe(first()).subscribe(category => {
        const { categoryPinyin } = this.albumInfo.crumbs;
        if (category !== categoryPinyin) {
          this.categoryStoreServe.setCategory(categoryPinyin);
        }
      });
      this.categoryStoreServe.setSubCategory([this.albumInfo.albumTitle]);
      this.pageServe.setPageInfo(
        this.albumInfo.albumTitle,
        '专辑详情',
        '小说，音乐，教育...'
      );
      this.cdr.markForCheck();
    });
    this.score$ = this.albumStoreServe.getScore();
    this.relateAlbums$ = this.albumStoreServe.getRelateAlbums();
  }

  trackByTracks(index: number, item: Track): number { return item.trackId; }
  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
