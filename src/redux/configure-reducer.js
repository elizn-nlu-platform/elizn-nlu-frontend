import { combineReducers } from 'redux';

const staticReducers = {
};

export default function createReducer(asyncReducers) {
  const reducers = {
    ...staticReducers,
    ...asyncReducers
  };
  return combineReducers(reducers);
}
