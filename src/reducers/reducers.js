/*****Reducers*****/

import { combineReducers } from 'redux';

import {
  SET_MOVIES,
  SET_USERDATA,
  SET_FAVORITE,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  SET_FILTER,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAVORITE:
      return action.value;
    case ADD_FAVORITE:
      return [...state, action.value];
    case DELETE_FAVORITE:
      return [...state.filter((movie) => movie._id !== action.value)];
    default:
      return state;
  }
}

function userData(state = '', action) {
  switch (action.type) {
    case SET_USERDATA:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userData,
  favoriteMovies,
});

export default moviesApp;
