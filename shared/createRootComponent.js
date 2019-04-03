import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
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

const createServeRootComponent = url => React.createElement(
  Provider, { store },
  React.createElement(
    StaticRouter,
    {
      location: url,
      context: {},
    },
    renderRoutes(routes),
  )
);


export default {
  createClientRootComponent,
  createServeRootComponent,
  routes,
};
