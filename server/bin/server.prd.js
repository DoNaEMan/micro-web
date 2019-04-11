require('@babel/register')({
  ignore: [/node_modules\//],
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

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const { matchRoutes, renderRoutes } = require('react-router-config');
const { renderToString, renderToNodeStream } = require('react-dom/server');
const { ChunkExtractor, ChunkExtractorManager } = require('@loadable/server');

const statsFile = path.resolve(__dirname, '../../dist/loadable-stats.json');
const { createServeRootComponent, routes } = require('../../shared/createRootComponent').default;

const app = new Koa();

app.use(views(path.resolve(__dirname, '../../'), {
  map: {
    html: 'ejs',
  },
}));

app.use(bodyParser());

const router = new Router();

app.use(async (ctx, next) => {
  if (!/^\/pages/.test(ctx.request.path)) return next();

  const matchedRouter = matchRoutes(routes[0].routes, ctx.request.path).filter(({ match }) => match.path !== '/');

  if (!Array.isArray(matchedRouter) || matchedRouter.length === 0) return next();

  const component = createServeRootComponent(ctx.request.url);

  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['index'] });

  const jsx = extractor.collectChunks(component);

  const html = renderToString(jsx);

  await ctx.render('client/index.html', {
    root: html,
    script: extractor.getScriptTags(),
    link: extractor.getStyleTags(),
  });
});

app.use(router.routes())
  .use(router.allowedMethods());

app.use(serve(path.resolve(__dirname, '../../dist')));
app.use(serve(path.resolve(__dirname, '../../static')));

app.listen(3000, () => {
  console.log('PRD bin listening on port 3000!\n');
});
