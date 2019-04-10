import loadable from '@loadable/component';
import Loading from '../../Loading';

export default [{
  path: '/index',
  exact: true,
  component: loadable(() => import('./B'))
}]