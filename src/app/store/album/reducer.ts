import {AlbumsInfo} from '../../services/apis/album.service';
import {AlbumInfo, RelateAlbum, TracksInfo} from '../../services/apis/types';
import {Action, createReducer, on} from '@ngrx/store';
import {setAlbumInfo, setAlbumsInfo, setRelateAlbums, setScore, setTracksInfo} from './actions';

export const AlbumFeatureKey = 'album';

export interface AlbumState {
  albumsInfo?: AlbumsInfo;
  albumInfo?: AlbumInfo; // 单个专辑详情
  score: number;
  tracksInfo?: TracksInfo;
  relateAlbums: RelateAlbum[];
}

export const initialState: AlbumState = {
  score: 0,
  relateAlbums: []
};


export const reducer = createReducer(
  initialState,
  on(setAlbumsInfo, (state, albumsInfo) => ({ ...state, albumsInfo })),
  on(setAlbumInfo, (state, albumInfo) => ({ ...state, albumInfo })),
  on(setScore, (state, { score }) => ({ ...state, score })),
  on(setRelateAlbums, (state, { relateAlbums }) => ({ ...state, relateAlbums })),
  on(setTracksInfo, (state, tracksInfo) => ({ ...state, tracksInfo }))
);

export function albumReducer(state: AlbumState, action: Action): AlbumState {
  return reducer(state, action);
}
