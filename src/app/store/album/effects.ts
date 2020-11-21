import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AlbumService, AlbumsInfo} from '../../services/apis/album.service';
import {
  requestAlbum,
  requestAlbumsInfo,
  requestTracksInfo,
  setAlbumInfo,
  setAlbumsInfo,
  setRelateAlbums,
  setScore,
  setTracksInfo
} from './actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {forkJoin, throwError} from 'rxjs';

@Injectable()
export class AlbumEffects {
  constructor(private actions$: Actions, private albumServe: AlbumService) {}
  readonly requestAlbums$ = createEffect(() => this.actions$.pipe(
      ofType(requestAlbumsInfo),
      mergeMap(payload => this.albumServe.albums(payload)),
      map(albumsInfo => setAlbumsInfo(albumsInfo)),
      catchError(error => throwError(error))
    )
  );

  readonly requestAlbum$ = createEffect(() => this.actions$.pipe(
      ofType(requestAlbum),
      mergeMap(action => {
        return forkJoin(
          this.albumServe.album(action.albumId),
          this.albumServe.albumScore(action.albumId),
          this.albumServe.relateAlbums(action.albumId)
        );
      }),
      switchMap(([albumInfo, score, relateAlbums]) => {
        return [
          setAlbumInfo({ ...albumInfo.mainInfo, albumId: albumInfo.albumId }),
          setScore({ score: score / 2 }),
          setRelateAlbums({ relateAlbums: relateAlbums.slice(0, 10) })
        ];
      })
    )
  );

  readonly requestTracksInfo$ = createEffect(() => this.actions$.pipe(
    ofType(requestTracksInfo),
    mergeMap(action => this.albumServe.tracks(action)),
    map(tracksInfo => setTracksInfo(tracksInfo))
  ));
}
