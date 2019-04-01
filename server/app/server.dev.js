require('babel-register')({
  ignore: /node_modules\//,
  presets: ['env', 'react'],
  plugins: ['add-module-exports'],
});

// scss compiler hook
require('css-modules-require-hook')({
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) => require('node-sass').renderSync({
    data,
    file: filename,
  }).css,
  camelCase: true,
  generateScopedName: '[path][name]__[local]',
});

// image compiler hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp', 'ico'],
  limit: 8000,
});

const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const serve = require('koa-static');
const convert = require('koa-convert');
const path = require('path');
const React = require('react');
const { matchRoutes, renderRoutes } = require('react-router-config');
const { renderToString, renderToNodeStream } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');

const config = require('../../webpack/webpack.dev.js');

const compiler = webpack(config);
const routes = require('../../shared/router');

const app = new Koa();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(convert(webpackHotMiddleware(compiler)));

app.use(views(path.resolve(__dirname, '../../'), {
  map: {
    html: 'ejs',
  },
}));

const router = new Router();

app.use(async (ctx, next) => {
  const matchedRouter = matchRoutes(routes, ctx.request.path).filter(({ match }) => match.path !== '/');

  if (!Array.isArray(matchedRouter) || matchedRouter.length === 0) {
    return next();
  }

  const html = React.createElement(
    StaticRouter,
    {
      location: ctx.request.url,
      context: {},
    },
    renderRoutes(routes)
  );

  await ctx.render('client/index.html', {
    root: renderToString(html),
  });
});

app.use(router.routes())
  .use(router.allowedMethods());

app.use(serve(path.resolve(__dirname, '../../public')));

app.listen(3000, () => {
  console.log('DEV app listening on port 3000!\n');
});
