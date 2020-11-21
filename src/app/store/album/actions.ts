import { createAction, props } from '@ngrx/store';
import {AlbumArgs, AlbumsInfo, AlbumTrackArgs} from "../../services/apis/album.service";
import {AlbumInfo, RelateAlbum, Track, TracksInfo} from "../../services/apis/types";

export const requestAlbumsInfo = createAction(
  '[Album] Request albums info',
  props<AlbumArgs>()
);

export const requestAlbum = createAction(
  '[Album] Request Album detail',
  props<{ albumId: string; }>()
);

export const requestTracksInfo = createAction(
  '[Album] Request Tracks Info',
  props<AlbumTrackArgs>()
);

export const setAlbumsInfo = createAction(
  '[Album] Set Albums info',
  props<AlbumsInfo>()
);

export const setAlbumInfo = createAction(
  '[Album] Set Album info',
  props<AlbumInfo>()
);

export const setScore = createAction(
  '[Album] Set Score',
  props<{ score: number; }>()
);

export const setTracksInfo = createAction(
  '[Album] Set Tracks info',
  props<TracksInfo>()
);


export const setRelateAlbums = createAction(
  '[Album] Set relate Albums',
  props<{ relateAlbums: RelateAlbum[]; }>()
);
