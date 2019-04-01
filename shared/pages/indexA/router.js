import loadable from 'loadable-components';

export default [
  {
    path: '/a',
    exact: true,
    component: loadable(() => import('./TestA'))
  }];