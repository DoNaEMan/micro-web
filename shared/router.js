import Router from './App';
import PagesIndexARouter from './pages/indexA/router';
import PagesIndexBRouter from './pages/indexB/router';

const addFolderNameForRoute = (routes = [], folderPathName = '') => routes.map(route => Object.assign(route, { path: folderPathName + route.path }));

const routes = [{
  component: Router,
  routes: [...addFolderNameForRoute(PagesIndexARouter, '/pages/indexA'), ...addFolderNameForRoute(PagesIndexBRouter, '/pages/indexB')],
}];

export default routes;
