import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Inject, Renderer2, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import {AlbumInfo, Track} from '../../services/apis/types';
import {animate, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';
import {PlayerStoreService} from '../../services/business/player.store.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

const PANEL_HEIGHT = 280;
const THUMBNAIL_WIDTH = 50;

@Component({
  selector: 'xm-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('playerPanel', [
      transition(':enter', [
        style({
          opacity: 0,
          height: 0
        }),
        animate('.2s', style({
          opacity: 1,
          height: '*'
        }))
      ]),
      transition(':leave', [
        style({
          overflow: 'hidden'
        }),
        animate('.2s', style({
          opacity: 0,
          height: 0
        }))
      ])
    ])
  ]
})
export class PlayerComponent implements OnInit, OnDestroy {
  @Input() trackList: Track[] = [];
  currentIndex = 0;
  currentTrack$: Observable<Track>;
  album$: Observable<AlbumInfo>;
  playing = false;
  private canPlay = false;
  private audioEl: HTMLAudioElement;
  showPanel = false;
  isDown = true;
  putAway = false;
  private hostEl: HTMLElement;
  private sub: Subscription;
  @Output() closed = new EventEmitter<void>();
  @ViewChild('player', { static: true }) readonly playerRef: ElementRef;
  @ViewChild('audio', { static: true }) readonly audioRef: ElementRef;
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private rd2: Renderer2,
    private playerStoreServe: PlayerStoreService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.playerStoreServe.getCurrentIndex().subscribe(currentIndex => {
      this.currentIndex = currentIndex;
      this.cdr.markForCheck();
    });
    this.currentTrack$ = this.playerStoreServe.getCurrentTrack();
    this.album$ = this.playerStoreServe.getAlbum();
    this.playerStoreServe.getPlaying().subscribe(playing => {
      this.setPlaying(playing);
      this.cdr.markForCheck();
    });
  }

  private setPlaying(playing: boolean): void {
    // console.log('playing', playing, this.playing);
    if (playing !== this.playing) {
      this.playing = playing;
      if (playing && this.canPlay) {
        this.audioEl.play();
      } else {
        this.audioEl.pause();
      }
    }
  }

  prev(index: number): void {
    if (this.trackList.length === 1) {
      this.loop();
    } else {
      const newIndex = index < 0 ? this.trackList.length - 1 : index;
      this.updateIndex(newIndex);
    }
  }

  next(index: number): void {
    if (this.trackList.length === 1) {
      this.loop();
    } else {
      const newIndex = index > this.trackList.length - 1 ? 0 : index;
      this.updateIndex(newIndex);
    }
  }

  delete(delIndex: number): void {
    let newTracks = this.trackList.slice();
    let newIndex = this.currentIndex;
    let delTarget: Track;
    if (newTracks.length <= 1) {
      newIndex = -1;
      delTarget = newTracks[0];
      newTracks = [];
    } else {
      if (delIndex < this.currentIndex) {
        newIndex--;
      }
      if (delIndex === this.currentIndex) {
        if (this.playing) {
          if (this.trackList[delIndex + 1]) {
            // 不用处理，后面的曲目会顶上来
          } else {
            newIndex--;
          }
        } else {
          newIndex = -1;
        }
      }
      delTarget = newTracks.splice(delIndex, 1)[0];
    }
    this.playerStoreServe.deleteTrack(delTarget?.trackId);
    this.updateIndex(newIndex);
  }

  togglePlay(): void {
    this.currentTrack$.pipe(first()).subscribe(currentTrack => {
      if (currentTrack) {
        if (this.canPlay) {
          this.playerStoreServe.setPlaying(!this.playing);
        }
      } else {
        if (this.trackList.length) {
          this.updateIndex(0);
        }
      }
    });
  }

  changePlay(index: number): void {
    if (this.currentIndex !== index) {
      this.updateIndex(index);
    }
  }

  private loop(): void {
    this.audioEl.currentTime = 0;
    this.play();
  }

  togglePanel(show: boolean): void {
    if (show) {
      const { top } = this.playerRef.nativeElement.getBoundingClientRect();
      this.isDown = top < PANEL_HEIGHT - 10;
      this.showPanel = true;
    } else {
      this.showPanel = false;
    }
  }

  private updateIndex(index: number): void {
    if (index !== this.currentIndex) {
      this.canPlay = false;
      this.playerStoreServe.setPlaying(false);
      this.playerStoreServe.setCurrentIndex(index);
    }
  }

  canplay(): void {
    this.canPlay = true;
    this.play();
  }

  private play(): void {
    if (!this.audioEl) {
      this.audioEl = this.audioRef.nativeElement;
    }
    this.playerStoreServe.setPlaying(true);
  }

  ended(): void {
    this.error();
    this.next(this.currentIndex + 1);
  }
  error(): void {
    this.playerStoreServe.setPlaying(false);
  }

  trackByTracks(index: number, item: Track): number {
    return item.trackId;
  }

  dragEnd(host: HTMLElement): void {
    console.log('dragEnd', host);
    this.hostEl = host;
    const { width, height, left, top } = host.getBoundingClientRect();
    const clientWidth = this.doc.documentElement.clientWidth;
    const maxTop = this.doc.documentElement.clientHeight - height;
    this.rd2.setStyle(host, 'transition', 'all .2s');
    if (top < 0) {
      this.rd2.setStyle(host, 'top', 0);
    }
    if (top > maxTop) {
      this.rd2.setStyle(host, 'top', maxTop + 'px');
    }
    if (clientWidth - left <= width / 2) {
      this.rd2.setStyle(host, 'left', (clientWidth - THUMBNAIL_WIDTH) + 'px');
      this.putAway = true;
    }
  }

  hoverHost(): void {
    if (this.putAway) {
      const maxLeft = this.doc.documentElement.clientWidth - this.hostEl.getBoundingClientRect().width;
      this.rd2.setStyle(this.hostEl, 'left', maxLeft + 'px');
      this.putAway = false;
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
