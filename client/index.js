import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { loadComponents } from 'loadable-components';

import routes from '../shared/router';

loadComponents().then(() => {
  ReactDOM.render(
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>,
      document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
