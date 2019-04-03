import React from 'react';
import ReactDOM from 'react-dom';
import { loadComponents } from 'loadable-components';

import { createClientRootComponent } from '../shared/createRootComponent';

loadComponents().then(() => {
  ReactDOM.hydrate(
    createClientRootComponent(),
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
