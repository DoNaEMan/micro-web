require('@babel/register')({
  ignore: [/node_modules\//, /server\/router\//],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@loadable/babel-plugin', 'dynamic-import-node', 'add-module-exports'],
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

const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const { matchRoutes, renderRoutes } = require('react-router-config');
const { renderToString, renderToNodeStream } = require('react-dom/server');
const { ChunkExtractor, ChunkExtractorManager } = require('@loadable/server');

const statsFile = path.resolve(__dirname, '../../dist/loadable-stats.json');
const { createServeRootComponent, routes, store } = require('../../shared/createRootComponent');

const app = new Koa();

app.use(views(path.resolve(__dirname, '../../'), {
  map: {
    html: 'ejs',
  },
}));

app.use(bodyParser());

app.use(async (ctx, next) => {
  if (!/^\/pages/.test(ctx.request.path)) return next();

  const matchedRouter = matchRoutes(routes[0].routes, ctx.request.path).filter(({ match }) => match.path !== '/');

  if (!Array.isArray(matchedRouter) || matchedRouter.length === 0) return next();

  const all = [], cb = [];

  matchedRouter.forEach((item) => {
    const { component } = item.route;
    const loaddata = (component.WrappedComponent && component.WrappedComponent.loaddata) || component.loaddata;
    if (!loaddata) return;
    const { request, callback } = loaddata('http://127.0.0.1:3000');
    all.push(request());
    cb.push(callback);
  });

  if (all) {
    const value = await Promise.all(all);
    cb.forEach((callback, index) => {
      callback(store.dispatch, value[index]);
    });
  }

  const state = JSON.stringify(store.getState() || {});

  const component = createServeRootComponent(ctx.request.url, store);

  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['index'] });

  const jsx = extractor.collectChunks(component);

  const html = renderToString(jsx);

  await ctx.render('client/index.html', {
    root: html,
    script: extractor.getScriptTags(),
    link: extractor.getStyleTags(),
    state,
  });
});

const router = new Router({ prefix: '/api' });
// 收集 ./router 文件夹中的所有router
const routerPath = path.resolve(__dirname, '../router');
fs.readdirSync(routerPath).filter(filename => filename.endsWith('.js')).forEach((filename) => {
  const subRouter = require(`${routerPath}/${filename}`);
  router.use(subRouter.routes(), subRouter.allowedMethods());
});

app.use(router.routes())
  .use(router.allowedMethods());

app.use(serve(path.resolve(__dirname, '../../dist')));
app.use(serve(path.resolve(__dirname, '../../static')));

app.listen(3000, () => {
  console.log('PRD bin listening on port 3000!\n');
});
