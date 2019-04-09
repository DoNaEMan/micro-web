require('babel-register')({
  ignore: /node_modules\//,
  presets: ['env', 'react'],
  plugins: ['add-module-exports', 'loadable-components/babel', 'dynamic-import-node'],
});

// less css hook
require('css-modules-require-hook')({
  extensions: ['.less', '.css'],
  processorOpts: { parser: require('postcss-less').parse },
  generateScopedName: '[local]__[hash:5]',
});

// sass css hook
require('css-modules-require-hook')({
  extensions: ['.scss'],
  processorOpts: { parser: require('postcss-scss').parse },
  generateScopedName: '[local]__[hash:5]',
});

// image compiler hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp', 'ico'],
  limit: 8000,
});

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');

const path = require('path');
const React = require('react');
const { matchRoutes, renderRoutes } = require('react-router-config');
const { renderToString, renderToNodeStream } = require('react-dom/server');
const { getLoadableState } = require('loadable-components/server');

const { createServeRootComponent, routes } = require('../../shared/createRootComponent');

const app = new Koa();

app.use(views(path.resolve(__dirname, '../../'), {
  map: {
    html: 'ejs',
  },
}));

const router = new Router();

app.use(async (ctx, next) => {
  const component = createServeRootComponent(ctx.request.url);

  const loadableState = await getLoadableState(component);

  const matchedRouter = matchRoutes(routes[0].routes, ctx.request.path).filter(({ match }) => match.path !== '/');

  if (!Array.isArray(matchedRouter) || matchedRouter.length === 0) {
    return next();
  }

  const html = renderToString(component);
  await ctx.render('client/index.html', {
    root: html,
    script: loadableState.getScriptTag(),
  });
});

app.use(router.routes())
  .use(router.allowedMethods());

app.use(serve(path.resolve(__dirname, '../../dist')));
app.use(serve(path.resolve(__dirname, '../../static')));

app.listen(3000, () => {
  console.log('PRD bin listening on port 3000!\n');
});
