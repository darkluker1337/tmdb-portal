import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = {
  movieId: null,
  currentPageOfMovie: 1,
  currentPageOfActor: 1,
  actorId: null,
};
export const setCurrentPageOfMovie = createAction('CURRENT_PAGE_MOVIE');
export const setCurrentPageOfActor = createAction('CURRENT_PAGE_ACTOR');
export const setMovieId = createAction('MOVIE_ID');
export const setActorId = createAction('ACTOR_ID');

export default createReducer(initialState, {
  [setMovieId]: function (state, action) {
    state.movieId = action.payload;
  },
  [setCurrentPageOfMovie]: function (state, action) {
    state.currentPageOfMovie = action.payload;
  },
  [setActorId]: function (state, action) {
    state.actorId = action.payload;
  },
  [setCurrentPageOfActor]: function (state, action) {
    state.currentPageOfActor = action.payload;
  },
});
