import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';

import Container from '$containers';
import createStore from '$redux/store';
import routes from '$routes';

const usedHistory = createHistory();
const store = createStore({}, usedHistory);

const render = (container) => {
  ReactDOM.render(
    <Provider store={store}>
      <Container>
        <Router history={usedHistory}>
          {renderRoutes(routes)}
        </Router>
      </Container>
    </Provider>,
    container,
  );
};


const init = () => {
  const container = document.querySelector('#app');
  render(container);
};

init();
