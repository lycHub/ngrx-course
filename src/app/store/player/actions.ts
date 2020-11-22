import { createAction, props } from '@ngrx/store';
import {AlbumInfo, Track} from '../../services/apis/types';

export const requestAlbum = createAction('[Player] Request Album', props<{ albumId: string; }>());
export const requestAudio = createAction('[Player] Request Audio', props<Track>());

export const setTracks = createAction('[Player] Set Tracks', props<{ tracks: Track[] }>());
export const addTrack = createAction('[Player] Add Track', props<Track>());
export const addTracks = createAction('[Player] Add Tracks', props<{ tracks: Track[] }>());
export const deleteTrack = createAction('[Player] Delete Track', props<{ trackId: number }>());
export const clearAll = createAction('[Player] Clear All');

export const setCurrentIndex = createAction('[Player] Set Current Index', props<{ index: number }>());
export const setCurrentTrack = createAction('[Player] Set Current Track', props<Track>());
export const setPlaying = createAction('[Player] Set Playing', props<{ playing: boolean }>());
export const setAlbum = createAction('[Player] Set Album', props<AlbumInfo>());
