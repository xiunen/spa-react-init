import { post } from '$constants/actionTypes';
import { CALL_API } from '$constants/symbols';

export const fetch = () => ({
  [CALL_API]: {
    url: '/post',
    types: [post.request, post.success, post.failure],
  },
});
