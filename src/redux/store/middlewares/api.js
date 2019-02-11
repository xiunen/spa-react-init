import { CALL_API } from '$constants/symbols';

export default () => (/* store */) => (next) => (action) => {
  const callAPI = action[CALL_API];

  if (!callAPI) {
    return next(action);
  }

  const [request, success, failure] = callAPI.types;
  next({ type: request });
  return fetch(callAPI.url, {

  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    const error = new Error(res.statusText);
    throw error;
  }).then(res => {
    next({ type: success, payload: res });
  }).catch(e => {
    next({ type: failure, payload: e });
  });
};
