import App from './App';
import PagesProductA from './pages/productA/router';
import PagesProductB from './pages/productB/router';

const addFolderNameForRoute = (routes = [], folderPathName = '') => routes.map(route => Object.assign(route, { path: folderPathName + route.path }));

const routes = [{
  component: App,
  routes: [...addFolderNameForRoute(PagesProductA, '/pages/productA'), ...addFolderNameForRoute(PagesProductB, '/pages/productB')],
}];

export default routes;