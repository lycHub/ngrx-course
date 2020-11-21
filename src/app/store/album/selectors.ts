import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AlbumFeatureKey, AlbumState} from './reducer';

export const selectAlbumFeature = createFeatureSelector<AlbumState>(AlbumFeatureKey);

const selectAlbumStates = (state: AlbumState) => state;
export const getAlbumsInfo = createSelector(selectAlbumStates, (state: AlbumState) => state.albumsInfo);
export const getAlbumInfo = createSelector(selectAlbumStates, (state: AlbumState) => state.albumInfo);
export const getScore = createSelector(selectAlbumStates, (state: AlbumState) => state.score);
export const getRelateAlbums = createSelector(selectAlbumStates, (state: AlbumState) => state.relateAlbums);
export const getTracksInfo = createSelector(selectAlbumStates, (state: AlbumState) => state.tracksInfo);
