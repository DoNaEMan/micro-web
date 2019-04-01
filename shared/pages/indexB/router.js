import loadable from 'loadable-components';

export default [{
  path: '/b',
  exact: true,
  component: loadable(() => import('./TestB')),
}]