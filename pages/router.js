import TestA from './TestA';
import TestB from './TestB';
import App from './App';

export default [{
  component: App,
  routes: [
    {
      path: '/a',
      exact: true,
      component: TestA,
    },
    {
      path: '/b',
      exact: true,
      component: TestB,
    },
  ]
}]
