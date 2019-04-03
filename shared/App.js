import React from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

const App = ({ route }) => (
  <div>
    <h1>Hello App</h1>
    <Link to="/pages/productA/index"><button>A</button></Link>
    <Link to="/pages/productB/index"><button>B</button></Link>
    {renderRoutes(route.routes)}
  </div>
);
export default App;
