import { combineReducers } from 'redux';

import post from './post';

export default (extraReducers = {}) => combineReducers({
  post,
  ...extraReducers,
});
