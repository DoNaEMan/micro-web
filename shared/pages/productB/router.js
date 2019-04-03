import loadable from 'loadable-components';

export default [{
  path: '/index',
  exact: true,
  component: loadable(() => import('./B')),
}]