import {adapter, PlayersFeatureKey, PlayerState} from "./reducer";
import {EntityState} from "@ngrx/entity";
import {Track} from "../../services/apis/types";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const { selectAll } = adapter.getSelectors();

export const selectPlayerFeature = createFeatureSelector<PlayerState>(PlayersFeatureKey);

const selectPlayerStates = (state: EntityState<Track>) => state;
export const getAllTracks = createSelector(selectPlayerStates, selectAll);

export const getCurrentIndex = createSelector(
  selectPlayerStates,
  (state: PlayerState) => state.currentIndex
);

export const getCurrentTrack = createSelector(
  selectPlayerStates,
  (state: PlayerState) => state.currentTrack
);

export const getPlaying = createSelector(
  selectPlayerStates,
  (state: PlayerState) => state.playing
);

export const getAlbum = createSelector(
  selectPlayerStates,
  (state: PlayerState) => state.album
);
