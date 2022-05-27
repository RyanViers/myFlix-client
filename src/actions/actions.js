/*****Actions*****/

export const SET_MOVIES = 'SET_MOVIES';
export const SET_USER = 'SET-USER';
export const SET_USERDATA = 'SET_USERDATA';
export const SET_FILTER = 'SET_FILTER';
export const SET_FAVORITE = 'SET_FAVORITE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

/*export function setUser(value) {
  return { type: SET_USER, value };
}*/

export function setUserData(value) {
  return { type: SET_USERDATA, value };
}

export function setFavorite(value) {
  return { type: SET_FAVORITE, value };
}

export function addFavorite(value) {
  return { type: ADD_FAVORITE, value };
}

export function deleteFavorite(value) {
  return { type: DELETE_FAVORITE, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}
