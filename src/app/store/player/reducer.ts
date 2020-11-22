import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {AlbumInfo, Track} from '../../services/apis/types';
import {Action, createReducer, on} from '@ngrx/store';
import {addTrack, addTracks, clearAll, deleteTrack, setAlbum, setCurrentIndex, setCurrentTrack, setPlaying, setTracks} from './actions';

export const PlayersFeatureKey = 'players';

export interface PlayerState extends EntityState<Track> {
  currentIndex: number;
  album?: AlbumInfo;
  playing: boolean;
  currentTrack?: Track;
}


export const adapter: EntityAdapter<Track> = createEntityAdapter<Track>({
  selectId: (b: Track) => b.trackId
});

export const initialState = adapter.getInitialState({
  currentIndex: -1,
  playing: false
});


export const reducer = createReducer(
  initialState,
  on(setTracks,
    (state, { tracks }) => adapter.setAll(tracks, state)
  ),
  on(addTrack,
    (state, track) => adapter.addOne(track, state)
  ),
  on(addTracks,
    (state, { tracks }) => adapter.addMany(tracks, state)
  ),
  on(deleteTrack,
    (state, { trackId }) => adapter.removeOne(trackId, state)
  ),
  on(clearAll,
    (state) => adapter.removeAll({
      ...state,
      currentIndex: -1,
      playing: false,
      album: null,
      currentTrack: null
    })
  ),
  on(setCurrentIndex, (state, { index }) => {
    return { ...state, currentIndex: index };
  }),
  on(setCurrentTrack, (state, track) => {
    return { ...state, currentTrack: track };
  }),
  on(setPlaying, (state, { playing }) => {
    return { ...state, playing };
  }),
  on(setAlbum, (state, album) => {
    return { ...state, album };
  })
);


export function playerReducer(state: PlayerState, action: Action): PlayerState {
  return reducer(state, action);
}
