import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';

import { createClientRootComponent } from '../shared/createRootComponent';

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    createClientRootComponent(),
    document.getElementById('root'),
  );
});
