import Loadable from 'react-loadable';
import Loading from '../../Loading';

export default [{
  path: '/index',
  exact: true,
  component: Loadable({
    loader: () => import('./A'),
    loading: Loading
  })
}];