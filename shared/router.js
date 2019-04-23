import App from './App';
import PagesProductA from './pages/productA/router';
import PagesProductB from './pages/productB/router';

const addFolderNameForRoute = (routes = [], folderPathName = '') => routes.map(route => {
  if (route.withoutPathName) { return route }
  return Object.assign(route, { path: folderPathName + route.path });
});

const routes = [{
  component: App,
  routes: [...addFolderNameForRoute(PagesProductA, '/productA'), ...addFolderNameForRoute(PagesProductB, '/productB')],
}];

export default routes;