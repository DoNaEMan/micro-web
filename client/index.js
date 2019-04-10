import React from 'react';
import ReactDOM from 'react-dom';
import { loadableReady } from '@loadable/component';

import * as a from '../shared/createRootComponent';

loadableReady(() => {
  ReactDOM.hydrate(
    a.default.createClientRootComponent(),
    document.getElementById('root'),
  );
});
