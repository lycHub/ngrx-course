import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AlbumService} from '../../services/apis/album.service';
import {MessageService} from '../../share/components/message/message.service';
import {requestAlbum, requestAudio, setCurrentTrack} from './actions';
import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {of, throwError} from 'rxjs';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private albumServe: AlbumService,
    // private playerStoreServe: PlayerStoreService,
    private messageServe: MessageService
  ) {}

  readonly requestAudio$ = createEffect(() => this.actions$.pipe(
    ofType(requestAudio),
    mergeMap(track => {
      return this.albumServe.trackAudio(track.trackId).pipe(withLatestFrom(of(track)));
    }),
    map(([audio, track]) => {
      if (!audio.src && audio.isPaid) {
        this.messageServe.warning('请先购买专辑');
        throw new Error('请先购买专辑');
      }
      // // console.log('audio', audio);
      track.src = audio.src;
      track.isPaid = audio.isPaid;
      return setCurrentTrack(track);
    }),
    catchError(error => throwError(error))
    )
  );


  readonly requestAlbum$ = createEffect(() => this.actions$.pipe(
    ofType(requestAlbum),
    mergeMap(action => this.albumServe.album(action.albumId)),
    tap(({ mainInfo, tracksInfo, albumId }) => {
      // this.playerStoreServe.setTracks(tracksInfo.tracks);
      // this.playerStoreServe.setCurrentIndex(0);
      // this.playerStoreServe.setAlbum({ ...mainInfo, albumId });
    }),
    catchError(error => throwError(error))
    ),
    { dispatch: false }
  );
}
