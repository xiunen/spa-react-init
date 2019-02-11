import { post } from '$constants/actionTypes';
import { LOADING_STATES } from '$constants/symbols';

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case post.request:
      return {
        ...state,
        loadingState: LOADING_STATES.LOADING,
      };
    case post.success:
      return {
        ...state,
        loadingState: LOADING_STATES.SUCCESS,
      };
    case post.failure:
      return {
        ...state,
        loadingState: LOADING_STATES.FAILURE,
      };
    default:
      return state;
  }
};
