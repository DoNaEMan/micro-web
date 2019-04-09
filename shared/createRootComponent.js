import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';

import store from './createStore';
import routes from './router';

const createClientRootComponent = () => (
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
);


const createServeRootComponent = (url, modules = []) => (
  <Loadable.Capture report={moduleName => modules.push(moduleName)}>
    <Provider store={store}>
      <StaticRouter location={url} context={{}}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  </Loadable.Capture>
);


export default {
  createClientRootComponent,
  createServeRootComponent,
  routes,
};
