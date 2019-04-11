import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import store from './createStore';
import routes from './router';

const createClientRootComponent = () => (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);

const createServeRootComponent = (url) => (
  <Provider store={store}>
    <StaticRouter location={url} context={{}}>
      {renderRoutes(routes)}
    </StaticRouter>
  </Provider>
);

export {
  createClientRootComponent,
  createServeRootComponent,
  routes,
  store
};
