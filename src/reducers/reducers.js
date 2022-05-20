/*****Reducers*****/

import { combineReducers } from 'redux';

import {
  SET_MOVIES,
  SET_USER,
  SET_USERDATA,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
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
    /*case ADD_FAVORITE:
      return action.value;
    case REMOVE_FAVORITE:
      return action.value;*/
    default:
      return state;
  }
}

/*function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
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
}*/

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  //user,
  //userData,
});
/*function moviesApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    movies: movies(state.movies, action),
  };
}*/

export default moviesApp;
