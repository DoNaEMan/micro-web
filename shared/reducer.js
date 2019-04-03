import { combineReducers } from 'redux';
import todos from './pages/productA/reducer';
import counter from './pages/productB/reducer';

export default combineReducers({
  todos,
  counter,
});
