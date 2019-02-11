import Home from '$containers/Home';
import Post from '$containers/Post';

const routes = [{
  path: '/',
  component: Home,
}, {
  path: '/post',
  component: Post,
}];

export default routes;
