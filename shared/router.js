import Router from './App';
import PagesProductARouter from './pages/productA/router';
import PagesProductBRouter from './pages/productB/router';

const addFolderNameForRoute = (routes = [], folderPathName = '') => routes.map(route => Object.assign(route, { path: folderPathName + route.path }));

const routes = [{
  component: Router,
  routes: [...addFolderNameForRoute(PagesProductARouter, '/pages/productA'), ...addFolderNameForRoute(PagesProductBRouter, '/pages/productB')],
}];

export default routes;
