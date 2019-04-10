import React from 'react';
import { renderRoutes } from 'react-router-config';
import { hot } from 'react-hot-loader';

import Layout from './components/Layout';

const App = ({ route }) => (
  <Layout>
    {renderRoutes(route.routes)}
  </Layout>
);
export default hot(module)(App);
