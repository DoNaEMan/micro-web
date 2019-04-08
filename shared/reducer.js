import { combineReducers } from 'redux';

import pagesProductA from './pages/productA/reducer';
import pagesProductB from './pages/productB/reducer';

export default combineReducers({
  pagesProductA, pagesProductB
});